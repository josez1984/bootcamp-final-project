
module.exports = function(pgPool) {    
    const user = require("../../controllers/user.js")(pgPool);    
    return {
        getSignUp: function(req, res) {        
            var fullUrl = req.get('host') + req.originalUrl;    
            console.log('Getting request from URL: ' + fullUrl + '; Redirecting to /login');    
            res.render("signup", {
                userAuth: false
            });
        },
        postSignUp: function(req, res) {
            var fullUrl = req.get('host') + req.originalUrl;    
            console.log('Getting request from URL: ' + fullUrl + ' to Endpoint /signup, Method: POST; Redirecting to /index');    
            console.log(req.body);
            return user.create(req, res);
        }
    }
};

