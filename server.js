var express = require("express")
var bodyParser = require("body-parser");
var path = require("path");

// Choose a port number
var PORT = process.env.PORT || 3000;

// Sequelize database import
var db = require(path.join(__dirname, '/models'));

// Initialize Express
var app = express();

// Use the public folder
app.use(express.static("public"));

// Intialize body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Initialize the routing file
var routes = require("./controllers/burgers_controller");

app.use("/", routes);

// Start the server
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});