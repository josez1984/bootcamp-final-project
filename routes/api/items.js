var path = require("path");

module.exports = function(app, pgPool) {  
    var auth = require("../../middleware/auth.js")(pgPool);
    // const item = require("../../controllers/item.js")(pgPool);    

    app.post("/api/items/image", (httpReq, httpRes)=>{
      console.log(httpReq.body);
    });

    app.post("/api/login", (httpReq, httpRes)=>{
      // return item.login(httpReq, httpRes);
    });

    // app.post("/api/users", (httpReq, httpRes)=>{
    //   return user.create(httpReq, httpRes);
    // });

    // app.get("/api/users/profile", auth.verifyToken, (httpReq, httpRes)=>{
    //   return user.profile(httpReq, httpRes);
    // })
};
