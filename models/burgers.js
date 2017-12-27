var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Burgers = sequelize.define("burgers", {
    burger_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    devoured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});

Burgers.sync();

module.exports = Burgers;