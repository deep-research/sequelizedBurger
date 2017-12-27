module.exports = function(sequelize, DataTypes) {
    var Burgers = sequelize.define("burgers", {
        burger_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        }
    });
    return Burgers
}