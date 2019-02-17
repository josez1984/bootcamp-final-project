var db = require("../models")

module.exports = {
  get: (httpReq, httpRes, io) => {
    db.sequelize.query(`
      SELECT 
        *, 
        (SELECT email from "Users" WHERE id = "Offers"."UserId") AS userEmail,
        (SELECT email from "Users" WHERE id = "Offers"."UserIdReceiverId") AS userReceiverEmail  
      FROM "Offers" WHERE "UserId" = :userId
      UNION ALL
      SELECT 
        *, 
        (SELECT email from "Users" WHERE id = "Offers"."UserId") AS userEmail,
        (SELECT email from "Users" WHERE id = "Offers"."UserIdReceiverId") AS userReceiverEmail    
      FROM "Offers" WHERE "UserIdReceiverId" = :userIdReceiver  
      `, {
      replacements: {
          userIdReceiver: httpReq.user.id,
          userId: httpReq.user.id
        }, 
        type: db.sequelize.QueryTypes.SELECT
      }
    ).then(sqlRes => {
      let offerIds = sqlRes.map(el => el.id)  
      let placeholders = offerIds.map(el => '?').join(',')
      db.sequelize.query(`
      SELECT 
        oi."offerId",
        i.id, 
        name, 
        description, 
        condition, 
        status 
      FROM "OfferItems" oi 
      JOIN "Items" i ON oi."itemId" = i.id
      WHERE "offerId" IN(${placeholders})`,{
        replacements: offerIds, 
        type: db.sequelize.QueryTypes.SELECT
      }).then(sqlRes2=>{
        for(var i = 0; i < sqlRes.length; i++) {
          for(var x = 0; x < sqlRes2.length; x++) {
            if(sqlRes[i].id === sqlRes2[x].offerId) {
              if(typeof sqlRes[i]['items'] === "undefined") {
                sqlRes[i]['items'] = []
                sqlRes[i]['items'].push(sqlRes2[x])
              } else {
                sqlRes[i]['items'].push(sqlRes2[x])
              }                           
            }
          }
        }
        return httpRes.status(200).json(sqlRes); 
      }).catch(sqlErr2 => {
        if(sqlErr2) { throw sqlErr2 }
        return httpRes.status(500).json({error: 'Database error'});                    
      })
    }).catch(sqlErr => {
      if(sqlErr) { throw sqlErr }
      return httpRes.status(500).json({error: 'Database error'});            
    })
  },
  create: async (httpReq, httpRes, io)=>{     
    var offeredItems = httpReq.body.offeredItems 
    let transaction;

    try {
      transaction = await db.sequelize.transaction()

      // Post Offer
      let sqlRes = await db.Offers.create({
        dollarAmt: httpReq.body.dollarAmt,
        message: httpReq.body.message,
        status: 'Response Pending',
        UserId: httpReq.user.id,
        UserIdReceiverId: httpReq.body.item.UserId  
      }, { transaction: transaction});
      
      // Post any Offer Items
      const repl = {         
        offerId: sqlRes.dataValues.id,
        createdAt: sqlRes.dataValues.createdAt,
        updatedAt: sqlRes.dataValues.updatedAt
      }

      for(var i = 0; i < offeredItems.length; i++) {        
        let el = offeredItems[i]        
        await db.sequelize.query(`
            INSERT INTO "OfferItems"(
              "itemId", 
              "offerId",
              "createdAt",
              "updatedAt")
            VALUES(:itemId,:offerId,:createdAt,:updatedAt)`, {
          replacements: {
              ...repl,
              itemId: el.id
            }, 
            type: db.sequelize.QueryTypes.SELECT,
            transaction: transaction 
          }
        )
        
        await db.Items.update({
          status: 'Offered',
        },{ 
          where: {
            id: el.id
          },
          transaction: transaction
        })
      }
      
      // Update the Item's status
      await db.Items.update({
        status: 'Offer Pending'
      },{
        where: {
          id: httpReq.body.item.id
        },
        transaction: transaction
      })
      
      await transaction.commit()
      return httpRes.status(200).json({message: 'Offer posted'});            
    } catch (err) {            
      if(err) { throw err }      
      await transaction.rollback()
      return httpRes.status(500).json({error: 'Database error'});            
    }
  }
}