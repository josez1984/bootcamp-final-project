var db = require("../models");

module.exports = {
  delete: (httpReq, httpRes)=>{

  },
  fetch: (httpReq, httpRes)=>{
    return db.Items.findAll({
      where:{
        UserId: httpReq.user.id
      }
    })
    .then(sqlRes => {
      httpRes.status(200).json(sqlRes);
    }).catch(sqlErr => {
      httpRes.status(500).json(sqlErr);
    })
  },
  create: (httpReq, httpRes)=>{               
    return db.Items.create({
      name: httpReq.body.name,
      description: httpReq.body.description,
      condition: httpReq.body.condition,
      UserId: httpReq.user.id
    }).then(function(sqlRes) {
      httpRes.status(200).json(sqlRes);
    }).catch(err => {      
      httpRes.status(500).json({error: 'Database error'});
    });
  },
  createImage: function(httpReq, httpRes, payload) {
    return db.Images.create(payload)
    .then(sqlRes => {
      httpRes.status(200).json(sqlRes);
    }).catch(err => {
      if (err) { throw err }
    })
  } 
}