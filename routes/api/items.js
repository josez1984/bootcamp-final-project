var path = require("path");
var cloudinary = require('cloudinary');
var authFn = require("../../middleware/auth.js");
const auth = authFn()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = function(app) {      
    const items = require("../../controllers/items.js");        

    app.delete("/api/items", auth.verifyToken, (httpReq, httpRes)=>{
      return items.delete(httpReq, httpRes);
    });

    app.get("/api/items", auth.verifyToken, (httpReq, httpRes)=>{
      return items.fetch(httpReq,httpRes);
    });

    app.post("/api/items", auth.verifyToken, (httpReq, httpRes)=>{
      return items.create(httpReq, httpRes);
    });

    app.post("/api/items/image", (httpReq, httpRes)=>{
      // console.log(httpReq.body);
      cloudinary.v2.uploader.upload(httpReq.body.image, {}, function(res, err){
        console.log(res);
        console.log(err);
      });
    });

    // app.post("/api/login", (httpReq, httpRes)=>{
    //   // return item.login(httpReq, httpRes);
    // });

    // app.post("/api/users", (httpReq, httpRes)=>{
    //   return user.create(httpReq, httpRes);
    // });

    // app.get("/api/users/profile", auth.verifyToken, (httpReq, httpRes)=>{
    //   return user.profile(httpReq, httpRes);
    // })
};
