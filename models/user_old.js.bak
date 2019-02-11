const helper = require("../controllers/helper.js");
const uuidv4 = require("uuid/v4");
const moment = require("moment");
const pgPool = require("../config/dbConnect.js");

module.exports = function() {
    return {
        profile: function(req, res, cb){
            pgPool.query({
                name: 'user-profile',
                text: `SELECT * FROM users WHERE uid = $1`,
                values: [req.user.uid]
            }).then(function(sqlRes) {  
                console.log(sqlRes)
                cb({
                    email: sqlRes.rows[0].email
                });          
            }).catch(function(e) {                
                cb(e);
            });
        },
        login: function(req, res, cb) {            
            pgPool.query({
                name: 'user-login',
                text: `SELECT * FROM users WHERE email = $1`,
                values: [                    
                    req.body.email                   
                ]
            }).then(function(res) {  
                console.log(res);
                cb(res);          
                // if(!res.rows[0].id) {
                //     httpRes.status(400).json({ error: "Error with DB" });
                // }
            }).catch(function(e) {
                if(e) { throw e }
                cb(e);
            });

            //  const text = 'SELECT * FROM users WHERE email = $1';
            // try {
            //   const { rows } = await db.query(text, [req.body.email]);
            //   if (!rows[0]) {
            //     return res.status(400).send({'message': 'The, login credentials you provided are incorrect'});
            //   }
            //   if(!Helper.comparePassword(rows[0].password, req.body.password)) {
            //     return res.status(400).send({ 'message': 'The credentials you provided are incorrect' });
            //   }
            //   const token = Helper.generateToken(rows[0].id);
            //   return res.status(200).send({ token });
            // } catch(error) {
            //   return res.status(400).send(error)
            // }
        },
        insert: function(req, res, cb) {
            // const hashPassword = helper.hashPassword(req.body.password);
            pgPool.query({
                name: 'insert-user',
                text: `INSERT INTO
                    users(uid, email, password, created_date, modified_date)
                    VALUES($1, $2, $3, $4, $5)
                    returning *`,
                values: [
                    uuidv4(),
                    req.body.email,
                    req.body.password,
                    moment(new Date()),
                    moment(new Date())
                  ]
            }).then(function(res) {  
                cb(res);          
                // if(!res.rows[0].id) {
                //     httpRes.status(400).json({ error: "Error with DB" });
                // }
            }).catch(function(e) {
                cb(e);
            });
        }
    }
}