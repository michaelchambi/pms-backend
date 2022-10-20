module.exports = (sequelize, Sequelize) => {
    const pms_action_permission = sequelize.define("pms_action_permission", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        permission: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return pms_action_permission;
};