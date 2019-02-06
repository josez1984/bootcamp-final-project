var path = require("path");

module.exports = function(app, pgPool) {  
    var auth = require("../../middleware/auth.js")(pgPool);
    const user = require("../../controllers/user.js")(pgPool);    

    app.post("/api/signup", (httpReq, httpRes)=>{
      return user.create(httpReq, httpRes);
    });

    app.post("/api/login", (httpReq, httpRes)=>{
      return user.login(httpReq, httpRes);
    });

    app.post("/api/users", (httpReq, httpRes)=>{
      return user.create(httpReq, httpRes);
    });

    app.get("/api/users/profile", auth.verifyToken, (httpReq, httpRes)=>{
      return user.profile(httpReq, httpRes);
    })
};
