var db = require("../models");
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  dashBoard: (httpReq, httpRes)=>{
    return db.Items.findAll({
      where: {        
        deleted: false
      },
      include: [{
        model: db.Images,
        required: false,
      }]
    }).then(sqlRes => {      
      httpRes.status(200).json(sqlRes);
    }).catch(sqlErr => {      
      httpRes.status(500).json(sqlErr);
    })
  },
  delete: (httpReq, httpRes, io)=>{    
      return db.Items.update(
        {
          deleted: false
        },
        {
          returning: true, 
          where: 
          {
            id: httpReq.body.bookId
          } 
        }
      ).then(function([ rowsUpdate, [updatedBook] ]) {
        console.log(updatedBook)
        io.emit('update_item', updatedBook)
        httpRes.status(200).json(updatedBook)
      }).catch(err => {
        console.log(err)
      })     
  },
  fetch: (httpReq, httpRes)=>{
    return db.Items.findAll({
      where: {
        UserId: httpReq.user.id,
        deleted: false
      },
      include: [{
        model: db.Images,
        required: false,
      }]
    }).then(sqlRes => {      
      httpRes.status(200).json(sqlRes);
    }).catch(sqlErr => {      
      httpRes.status(500).json(sqlErr);
    })
  },
  create: (httpReq, httpRes, io)=>{               
    return db.Items.create({
      name: httpReq.body.name,
      description: httpReq.body.description,
      condition: httpReq.body.condition,
      UserId: httpReq.user.id,
      deleted: false
    }).then(function(sqlRes) {
      io.emit('new_item', sqlRes)
      httpRes.status(200).json(sqlRes);
    }).catch(err => {      
      if(err) { throw err }
      httpRes.status(500).json({error: 'Database error'});
    });
  },
  createImage: function(httpReq, httpRes, io) {
    cloudinary.v2.uploader.upload(httpReq.body.image, {}, function(err, res){
      if(err) {
        return httpRes.status(500).json({ error: 'There was an error uploading the picture to the cloud.' });
      }
      httpReq.body.image = ''      
      db.Images.create({
        url: res.secure_url,
        ItemId: httpReq.body.itemId
      }).then(sqlRes => {
        io.emit('update_item', sqlRes);
        httpRes.status(200).json(sqlRes);
      }).catch(err => {
        if (err) { throw err }
        return httpRes.status(400).json({ error: "There was an error saving the image URL to the database."} )
      })
    });
  } 
}