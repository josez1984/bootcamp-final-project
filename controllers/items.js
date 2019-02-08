var db = require("../models");

module.exports = function() {
    return {
        create: function(payload) {            
          console.log(payload);
          return db.Items.create(req.body).then(function(sqlRes) {
            res.json(sqlRes);
          });
        } 
    }
}
