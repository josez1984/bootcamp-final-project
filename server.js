const dotenv = require('dotenv');
require('dotenv').load();

var express = require("express");
var bodyParser = require("body-parser");
const pgPool = require("./config/dbConnect.js");
var cookieParser = require('cookie-parser')
var cookieCreate = require("./middleware/cookieCreate.js");

var PORT = process.env.PORT || 8080;
var app = express();

app.use(cookieParser());
app.use(cookieCreate);

app.use(express.static("public"));
app.use(express.static(__dirname + "/vue/dist"));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({limit: '100mb'}));

var db = require("./models");
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// require("./routes/htmlRoutes.js")(app, pgPool);
require("./routes/api/users.js")(app, pgPool);
require("./routes/api/items.js")(app, pgPool);

db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
});