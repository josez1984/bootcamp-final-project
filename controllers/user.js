const moment = require("moment");
const uuidv4 = require("uuid/v4");
const helper = require("./helper.js");
const db = require("../models")

module.exports = function(pgPool) {
    // const userModel = require("../models/user.js")();
    return {
        create: function(httpReq, httpRes) {            
            if(!httpReq.body.email || !httpReq.body.password) {
                return httpRes.status(400).json({ error: true, message: "Email/Password missing from the body of the request" });
            }

            if(!helper.isValidEmail(httpReq.body.email)) {
                return httpRes.status(400).json({ error: true, message: "Not a valid email." });
            }

            return db.Users.create({                
                email: httpReq.body.email,
                password: httpReq.body.password                    
            }).then(sqlRes=>{
                httpRes.status(200).json(sqlRes);
            }).catch(err => {
                if(err) { throw err }
                httpRes.status(500).json(err);
            })
            // return db.Items.create({
            //     name: httpReq.body.name,
            //     description: httpReq.body.description,
            //     condition: httpReq.body.condition,
            //   }).then(function(sqlRes) {
            //     httpRes.status(200).json(sqlRes);
            //   });
            // return userModel.insert(req, res, function(sqlRes) {
            //     console.log(sqlRes);
            //     if(sqlRes.name === "error") {                    
            //         return res.status(500).json({ error: true, message: sqlRes.detail });
            //     } else {
            //         return res.status(200).json({ success: true });
            //     }
            // });
        },
        login: function(req, res) {
            if (!req.body.email || !req.body.password) {
              return res.status(400).send({'message': 'Some values are missing'});
            }
            if (!helper.isValidEmail(req.body.email)) {
              return res.status(400).send({ 'message': 'Please enter a valid email address' });
            }
            
            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            }).then(sqlRes => {                
                if(!sqlRes) {
                    return res.status(400).json({ error: "Email not found." });
                }

                if(req.body.password !== sqlRes.dataValues.password) {
                    return res.status(400).json({ error: "Wrong Password." });
                }

                const token = helper.generateToken(sqlRes.dataValues.id);                                    
                res.cookie('key', token, { maxAge: 900000, httpOnly: true });                
                return res.status(200).json({ 
                    token: token, 
                    user: {
                        email: sqlRes.dataValues.email
                    } 
                });
            });

            // pgPool.query({
            //     name: 'user-login',
            //     text: `SELECT * FROM users WHERE email = $1`,
            //     values: [                    
            //         req.body.email                   
            //     ]
            // }).then(function(res) {  
            //     console.log(res);
            //     cb(res);          
            //     // if(!res.rows[0].id) {
            //     //     httpRes.status(400).json({ error: "Error with DB" });
            //     // }
            // }).catch(function(e) {
            //     if(e) { throw e }
            //     cb(e);
            // });

            // return userModel.login(req, res, function(sqlRes) {                
            //     if(sqlRes.name === "error") {                    
            //         return res.status(500).json({ error: true, message: sqlRes.detail });
            //     } else {
            //         if (!sqlRes.rows[0]) {
            //             return res.status(400).json({'message': 'The, login credentials you provided are incorrect'});
            //         }

            //         if(!helper.comparePassword(sqlRes.rows[0].password, req.body.password)) {
            //             return res.status(400).json({ 'message': 'The credentials you provided are incorrect' });
            //         }
                    
            //         const token = helper.generateToken(sqlRes.rows[0].uid);                    
            //         res.cookie('key', token, { maxAge: 900000, httpOnly: true });
            //         return res.status(200).json({ token: token, userData: sqlRes.rows });                                    
            //     }
            // });
        },
        profile: function(req, res) {                       
            if(!req.user.uid) {
                return res.status(400).json({ 'message': 'No valid credentials found in the request' });
            }            
            // return userModel.profile(req, res, function(sqlRes){  
            //     return res.status(200).json(sqlRes);
            //     // console.log(sqlRes);              
            //     // if(sqlRes.name === "error") {                    
            //     //     return res.status(500).json({ error: true, message: sqlRes.detail });
            //     // } else {
            //     //     if (!sqlRes.rows[0]) {
            //     //         return res.status(400).json({'message': 'No record found in the database'});
            //     //     }
            //     //     return res.status(200).json({
            //     //         email: sqlRes.rows[0]
            //     //     })
            //     // }
            // })
        }
    }
}