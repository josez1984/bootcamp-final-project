module.exports = function(pgPool) {
    const user = require("../../controllers/user.js")(pgPool);    
    return {
        getSignIn: function(req, res) {        
            var fullUrl = req.get('host') + req.originalUrl;    
            console.log('Getting request from URL: ' + fullUrl + '; Redirecting to /login');    
            res.render("signin", {
                userAuth: false
            });
        },
        postSignIn: function(req, res) {
            var fullUrl = req.get('host') + req.originalUrl;    
            console.log('Getting request from URL: ' + fullUrl + ' to Endpoint /login, Method: POST');    
            console.log('Request');
            console.log(req);
            return user.login(req, res);
        }
    }
};

// module.exports = function(req, res) {        
//     var fullUrl = req.get('host') + req.originalUrl;    
//     console.log('Getting request from URL: ' + fullUrl + '; Redirecting to /login');    
//     res.render("login", {
//         userAuth: false
//     });
// }