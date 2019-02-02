
module.exports = function(pgPool) {    
    const leadsModel = require("../../models/lead.js")(pgPool);    
    return {
        getDashboard: function(req, res) {        
            var fullUrl = req.get('host') + req.originalUrl;    
            console.log('Getting request from URL: ' + fullUrl + '; Redirecting to /agent-dashboard');    
            console.log("Are we authenticated ??? -> req.user = " + req.user);
            var userAuth = false;
            if(req.user.uid) {
                userAuth = true;
            }            
            
            leadsModel.getAll(req, res, function(sqlRes) {    
                console.log(sqlRes.rows);            
                res.render("agent-dashboard", { 
                    userEmail: req.user.email,
                    userUid: req.user.Uid,
                    userAuth: userAuth,
                    leads: sqlRes.rows
                });    
            })
            
        }
        // postSignUp: function(req, res) {
        //     var fullUrl = req.get('host') + req.originalUrl;    
        //     console.log('Getting request from URL: ' + fullUrl + ' to Endpoint /signup, Method: POST; Redirecting to /index');    
        //     console.log(req.body);
        //     return user.create(req, res);
        // }
    }
};

