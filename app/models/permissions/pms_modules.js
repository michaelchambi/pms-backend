module.exports = (sequelize, Sequelize) => {
    const pms_modules = sequelize.define("pms_modules", {
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

        icon: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        linkName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,

        }
    });

    return pms_modules;
};