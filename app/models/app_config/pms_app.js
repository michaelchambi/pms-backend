module.exports = (sequelize, Sequelize) => {
    const pms_app = sequelize.define("pms_app", {
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

        institution: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },

        logo: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },

        website: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },

        status: {
            type: Sequelize.INTEGER,
            allowNull: false,

        }
    });

    return pms_app;
};