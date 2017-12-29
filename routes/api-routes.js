var db = require("../models");

// Get request for the index page
module.exports = function(app) {
    app.get('/index', function(req, res) {
        // Select all of the burgers
        db.Burgers.findAll({}).then(function(results) {
            // Make the data into an object
            var hbsObject = { burgers: results };

            // Send the data to the handlebars index page
            res.render('index', hbsObject);
        });
    });

    // Post request for the API
    app.post("/api/burgers", function(req, res) {
        // Take the burger name from the web page and send it to the database
        db.Burgers.create({
            burger_name: req.body.burgerName.trim()
        }).then(function(results) {
        // refresh the page
            res.redirect("/index")
        }).catch(function(err) {
            res.json(err);
        })
    });

    // Put request for the API
    app.put("/api/burgers/:id", function(req, res) {
        // Update a specific burger to being eaten based upon the URL query
        db.Burgers.update({
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
    app.delete("/api/burgers/:id", function(req, res) {
        // Delete a specific burger based upon the URL query
        db.Burgers.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(results) {
            res.json(results);
        })
    });

    // Send any other url back to the index page
    app.get("/*", function(req, res) {
        res.redirect("/index")
    })
}