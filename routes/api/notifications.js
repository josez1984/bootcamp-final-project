var path = require("path");
var authFn = require("../../middleware/auth.js");
const auth = authFn()

module.exports = function(app, io) {      
    const notification = require("../../controllers/notifications.js");        

    app.get("/api/notifications", auth.verifyToken, (httpReq, httpRes)=>{      
      console.log("DEBUG: Notification API GET endpoint")   
      return notification.get(httpReq,httpRes,io);
    });

    
    // app.delete("/api/items", auth.verifyToken, (httpReq, httpRes)=>{      
    //   return items.delete(httpReq, httpRes, io);
    // });

    // app.get("/api/items", auth.verifyToken, (httpReq, httpRes)=>{
    //   return items.fetch(httpReq,httpRes);
    // });

    // app.post("/api/items", auth.verifyToken, (httpReq, httpRes)=>{
    //   if(httpReq.body.id) {
    //     return items.update(httpReq, httpRes, io);
    //   } else {
    //     return items.create(httpReq, httpRes, io);
    //   }
    // });

    // app.post("/api/items/image", (httpReq, httpRes)=>{      
    //   return items.createImage(httpReq, httpRes, io);
    // });
};
