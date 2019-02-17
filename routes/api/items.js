var path = require("path");
var cloudinary = require('cloudinary');
var authFn = require("../../middleware/auth.js");
const auth = authFn()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = function(app, io) {      
    const items = require("../../controllers/items.js");        

    app.get("/api/items/dashboard", auth.verifyToken, (httpReq, httpRes)=>{
      return items.dashBoard(httpReq,httpRes);
    });

    app.delete("/api/items", auth.verifyToken, (httpReq, httpRes)=>{
      console.log('app.delete(): ', httpReq.body)
      return items.delete(httpReq, httpRes, io);
    });

    app.get("/api/items", auth.verifyToken, (httpReq, httpRes)=>{
      console.log(httpReq.data)
      return items.fetch(httpReq,httpRes);
    });

    app.post("/api/items", auth.verifyToken, (httpReq, httpRes)=>{
      if(httpReq.body.id) {
        return items.update(httpReq, httpRes, io);
      } else {
        return items.create(httpReq, httpRes, io);
      }
    });

    app.post("/api/items/image", (httpReq, httpRes)=>{      
      return items.createImage(httpReq, httpRes, io);
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
