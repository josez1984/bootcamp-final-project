var path = require("path");
var authFn = require("../../middleware/auth.js");
const auth = authFn()

module.exports = function(app, io) {      
    const offers = require("../../controllers/offers.js");        

    app.post("/api/offers", auth.verifyToken, (httpReq, httpRes)=>{      
      return offers.create(httpReq,httpRes,io);
    });

    app.get("/api/offers", auth.verifyToken, (httpReq, httpRes)=>{      
      return offers.get(httpReq,httpRes,io);
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
