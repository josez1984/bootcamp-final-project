const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = function() {
    const pgPool = {};
    return {       
        verifyToken: function(req, res, next) {            
            var token = req.headers['x-access-token'];            
            if(!token) {                
                token = req.cookies.key;                
                if(!token) {
                    return res.status(400).json({ error: true, message: "Auth Token is not provided" });
                }
            }

            jwt.verify(token, process.env.SECRET,(err,decoded)=>{
                if(err) {                    
                    return res.status(400).json({ error: true, message: 'There was a problem with the authentication token provided.' });    
                }
                else if(Date.now() < decoded.exp) {                    
                    return res.status(400).json({ error: true, message: 'The token provided is expired.' });    
                }                

                db.Users.findOne({
                    where: {
                        id: decoded.userId
                    }
                }).then(sqlRes => {                    
                    if(!sqlRes) {
                        return res.status(400).send({ 'message': 'No user found for the provided token.' });  
                    }

                    req.user = { 
                        id: sqlRes.dataValues.id,
                        email: sqlRes.dataValues.email 
                    };                              
                    next();
                          
                }).catch(function(err) {                                      
                    return res.status(400).send({ 'message': 'There was an error at the database level.' });
                });

                // pgPool.query({
                //     name: 'get-user-id',
                //     text: `SELECT * FROM users WHERE uid = $1`,
                //     values: [decoded.userId]
                // }).then(function(sqlRes) {
                //     if(!sqlRes.rows[0]) {
                //         return res.status(400).send({ 'message': 'No user found for the provided token.' });
                //     }                    
                //     req.user = { 
                //         uid: decoded.userId,
                //         email: sqlRes.rows[0].email 
                //     };                                        
                //     next();
                // }).catch(function(err) {                    
                //     return res.status(400).send({ 'message': 'There was an error at the database level.' });
                // });                
            })
        }
    }
}