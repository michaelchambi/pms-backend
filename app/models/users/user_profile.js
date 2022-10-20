module.exports = (sequelize, Sequelize) => {
    const User_Profile = sequelize.define("tbluser_profiles", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        courtId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        zoneId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        status: {
            type: Sequelize.INTEGER,
            allowNull: false,

        }
    });

    return User_Profile;
};