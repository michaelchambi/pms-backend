const users = require("./users");
const pms_profile = require("./pms_profile");
module.exports = (sequelize, Sequelize) => {
    const User_Roles = sequelize.define("tbluser_roles", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

    });

    return User_Roles;
};