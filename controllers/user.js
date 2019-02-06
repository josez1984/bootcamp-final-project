const moment = require("moment");
const uuidv4 = require("uuid/v4");
const helper = require("./helper.js");

module.exports = function(pgPool) {
    const userModel = require("../models/user.js")(pgPool);
    return {
        create: function(req, res) {            
            if(!req.body.email || !req.body.password) {
                return res.status(400).json({ error: true, message: "Email/Password missing from the body of the request" });
            }

            if(!helper.isValidEmail(req.body.email)) {
                return res.status(400).json({ error: true, message: "Not a valid email." });
            }

            return userModel.insert(req, res, function(sqlRes) {
                console.log(sqlRes);
                if(sqlRes.name === "error") {                    
                    return res.status(500).json({ error: true, message: sqlRes.detail });
                } else {
                    return res.status(200).json({ success: true });
                }
            });
        },
        login: function(req, res) {
            if (!req.body.email || !req.body.password) {
              return res.status(400).send({'message': 'Some values are missing'});
            }
            if (!helper.isValidEmail(req.body.email)) {
              return res.status(400).send({ 'message': 'Please enter a valid email address' });
            }

            return userModel.login(req, res, function(sqlRes) {                
                if(sqlRes.name === "error") {                    
                    return res.status(500).json({ error: true, message: sqlRes.detail });
                } else {
                    if (!sqlRes.rows[0]) {
                        return res.status(400).json({'message': 'The, login credentials you provided are incorrect'});
                    }

                    if(!helper.comparePassword(sqlRes.rows[0].password, req.body.password)) {
                        return res.status(400).json({ 'message': 'The credentials you provided are incorrect' });
                    }
                    
                    const token = helper.generateToken(sqlRes.rows[0].uid);                    
                    res.cookie('key', token, { maxAge: 900000, httpOnly: true });
                    return res.status(200).json({ token: token, userData: sqlRes.rows });                                    
                }
            });
        },
        profile: function(req, res) {                       
            if(!req.user.uid) {
                return res.status(400).json({ 'message': 'No valid credentials found in the request' });
            }            
            return userModel.profile(req, res, function(sqlRes){  
                return res.status(200).json(sqlRes);
                // console.log(sqlRes);              
                // if(sqlRes.name === "error") {                    
                //     return res.status(500).json({ error: true, message: sqlRes.detail });
                // } else {
                //     if (!sqlRes.rows[0]) {
                //         return res.status(400).json({'message': 'No record found in the database'});
                //     }
                //     return res.status(200).json({
                //         email: sqlRes.rows[0]
                //     })
                // }
            })
        }
    }
}