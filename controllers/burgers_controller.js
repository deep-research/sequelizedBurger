var express = require("express")
var router = express.Router();
var burgers = require("../models/burgers")
var db = require("../models");

// Get request for the index page
router.get('/index', function(req, res) {
    // Select all of the burgers
    db.burgers.findAll({}).then(function(results) {
        // Make the data into an object
        var hbsObject = { burgers: results };

        // Send the data to the handlebars index page
        res.render('index', hbsObject);
    });
});

// Post request for the API
router.post("/api/burgers", function(req, res) {
    // Take the burger name from the web page and send it to the database
    db.burgers.create({
        burger_name: req.body.burgerName.trim()
    }).then(function(results) {
    // refresh the page
        res.redirect("/index")
    });
});

// Put request for the API
router.put("/api/burgers/:id", function(req, res) {
    // Update a specific burger to being eaten based upon the URL query
    db.burgers.update({
        devoured: 1
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(results) {
        res.json(results);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// Put request for the API
router.delete("/api/burgers/:id", function(req, res) {
    // Delete a specific burger based upon the URL query
    db.burgers.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(results) {
        res.json(results);
    })
});

// Send any other url back to the index page
router.get("/*", function(req, res) {
    res.redirect("/index")
});

module.exports = router;