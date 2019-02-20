var db = require("../models")

module.exports = {  
  offer: (payload) => {

  },
  get: (httpReq, httpRes, io) => {      
    db.sequelize.query(`
        SELECT * FROM "Notifications" 
        WHERE "userId" = :userId
        AND seen = 'f'
      `, {
      replacements: {
          userId: httpReq.user.id
        }, 
        type: db.sequelize.QueryTypes.SELECT,        
    }).then(sqlRes => {
      console.log('DEBUG: notification.get(): ', sqlRes)
      return httpRes.status(200).json(sqlRes); 
    }).catch(sqlErr => {
      console.log(sqlErr)
      return httpRes.status(500).json({error: 'Database error'});            
    })
  },
  create: (payload) => {
    db.Notifications.create(payload)
    .then(sqlRes=>{
      return true 
    }).catch(sqlErr=>{
      return false
    })
  }
}