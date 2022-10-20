module.exports = (sequelize, Sequelize) => {
    const pms_sub_module_action = sequelize.define("pms_sub_module_action", {
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

    return pms_sub_module_action;
};