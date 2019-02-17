const dotenv = require('dotenv');
require('dotenv').load();

var express = require("express");
var bodyParser = require("body-parser");
const pgPool = require("./config/dbConnect.js");
var cookieParser = require('cookie-parser')
var cookieCreate = require("./middleware/cookieCreate.js");

var PORT = process.env.PORT || 8080;
var app = express();
var db = require("./models");

var io = require('socket.io').listen(app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
    db.sequelize.sync({force: false});
}), {path: '/api/socket.io'});

io.on('connection', function(socket){
  console.log('DEBUG: a user connected');
  
  socket.on('connect_response', function(payload){
    console.log('Client responded to the connection.');
  });
});

app.use(cookieParser());
app.use(cookieCreate);

app.use(express.static("public"));
app.use(express.static(__dirname + "/vue/dist"));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({limit: '100mb'}));

// var db = require("./models");

require("./routes/api/users.js")(app, pgPool);
require("./routes/api/items.js")(app, io);
require("./routes/api/offers.js")(app, io);
