var db = require("../models")
var notifications = require("./notifications")

module.exports = {
  accept: async (httpReq, httpRes, io) => {  
    console.log(httpReq.body)  
    let transaction;    
    try {
      transaction = await db.sequelize.transaction()
      
      await db.Offers.update({
          status: 'Accepted',
        },{ 
          where: {
            id: httpReq.body.id
          },
        transaction: transaction
      })
            
      await transaction.commit()
      io.emit('offer_update', { 
        action: 'OFFER_ACCEPTED',
        acceptanceUserId: httpReq.body.userEmail
      })

      return httpRes.status(200).json({message: 'Offer accepted'});            
    } catch (err) {            
      if(err) { throw err }      
      await transaction.rollback()
      return httpRes.status(500).json({error: 'Database error'});            
    }    
  },
  get: (httpReq, httpRes, io) => {    
    const query = `      
      SELECT 
        o.id,o."dollarAmt",o.message,o.status,o."itemId",i.name AS "itemName",i.description AS "itemDescription",
        (SELECT email from "Users" WHERE id = o."UserId") AS userEmail,
        (SELECT email from "Users" WHERE id = o."UserIdReceiverId") AS userReceiverEmail,  
        (SELECT url FROM "Images" WHERE "ItemId" = i.id ORDER BY id LIMIT 1) AS "itemImgUrl"
      FROM "Offers" o 
      LEFT JOIN "Items" i 
      ON o."itemId" = i.id
      WHERE o."UserId" = :userId
      UNION ALL
      SELECT 
        o.id,o."dollarAmt",o.message,o.status,o."itemId",i.name AS "itemName",i.description AS "itemDescription",
        (SELECT email from "Users" WHERE id = o."UserId") AS userEmail,
        (SELECT email from "Users" WHERE id = o."UserIdReceiverId") AS userReceiverEmail,
        (SELECT url FROM "Images" WHERE "ItemId" = i.id ORDER BY id LIMIT 1) AS "itemImgUrl"    
      FROM "Offers" o 
      LEFT JOIN "Items" i 
      ON o."itemId" = i.id
      WHERE o."UserIdReceiverId" = :userIdReceiver`
      
    db.sequelize.query(query, {
      replacements: {
          userIdReceiver: httpReq.user.id,
          userId: httpReq.user.id
        }, 
        type: db.sequelize.QueryTypes.SELECT
      }
    ).then(sqlRes => {
      if(sqlRes.length <= 0) {
        return httpRes.status(200).json({});
      }
      
      let offerIds = sqlRes.map(el => el.id)  
      let placeholders = offerIds.map(el => '?').join(',')
      db.sequelize.query(`
      SELECT 
        oi."offerId",
        i.id, 
        name, 
        description, 
        condition, 
        status,
        (SELECT url FROM "Images" WHERE "ItemId" = i.id ORDER BY id LIMIT 1) AS "imageUrl"
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
      const offerReceiver = await db.Users.findOne({
        where: {
          id: httpReq.body.item.UserId
        }
      })

      let sqlRes = await db.Offers.create({
        dollarAmt: httpReq.body.dollarAmt,
        message: httpReq.body.message,
        status: 'Response Pending',
        UserId: httpReq.user.id,
        itemId: httpReq.body.itemId,
        UserIdReceiverId: httpReq.body.item.UserId  
      }, { transaction: transaction});
      
      const newOfferId = sqlRes.dataValues.id
      // Post any Offer Items
      const repl = {         
        offerId: newOfferId,
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
      
      const notification = {
        header: 'Offer Received',
        message: 'You have received a new Offer',
        recordType: 'NEW_OFFER',
        recordId: newOfferId,
        userId: httpReq.body.item.UserId, 
        userEmail: offerReceiver.email,       
        seen: false
      }
      await db.Notifications.create(notification, {
        transaction: transaction
      })

      await transaction.commit()
      io.emit('new_notification', notification)      
      io.emit('offer_update')
      return httpRes.status(200).json({message: 'Offer posted'});            
    } catch (err) {            
      if(err) { throw err }      
      await transaction.rollback()
      return httpRes.status(500).json({error: 'Database error'});            
    }
  }
}