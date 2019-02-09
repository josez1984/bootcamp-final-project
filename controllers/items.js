var db = require("../models");

module.exports = {
  create: function(httpReq, httpRes) {            
    return db.Items.create({
      name: httpReq.body.name,
      description: httpReq.body.description,
      condition: httpReq.body.condition,
    }).then(function(sqlRes) {
      httpRes.status(200).json(sqlRes);
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