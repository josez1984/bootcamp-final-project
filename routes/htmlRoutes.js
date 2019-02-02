var path = require("path");


module.exports = function(app, pgPool) {  
    var auth = require("../middleware/auth.js")(pgPool);
    
    var signIn = require("./html/signIn.js")(pgPool);
    var signUp = require("./html/signup.js")(pgPool);
    var agentDashboard = require("./html/agentDashboard.js")(pgPool);

    // app.get("/", require("./html/indexGet.js"));
    
    app.get("/api/login", signIn.getSignIn);
    app.post("/api/login", signIn.postSignIn);

    // app.get("/agent-dashboard",  auth.verifyToken, agentDashboard.getDashboard);

    app.get("/api/signup", signUp.getSignUp);
    app.post("/api/users", signUp.postSignUp);
    return user.create(req, res);
  // // cms route loads cms.html
  // app.get("/cms", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/cms.html"));
  // });

  // // blog route loads blog.html
  // app.get("/blog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // // authors route loads author-manager.html
  // app.get("/authors", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });

};
