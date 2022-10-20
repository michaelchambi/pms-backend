module.exports = (sequelize, Sequelize) => {
    const pms_profile = sequelize.define("pms_profile", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },

        status: {
            type: Sequelize.INTEGER,
            allowNull: false,

        }
    });

    return pms_profile;
};