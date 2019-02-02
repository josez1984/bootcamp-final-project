module.exports = function(req, res) {        
    var fullUrl = req.get('host') + req.originalUrl;    
    console.log('Getting request from URL: ' + fullUrl);    
    res.render("index", {
        userAuth: false
    });
}