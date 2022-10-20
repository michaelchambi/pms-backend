module.exports = (sequelize, Sequelize) => {
    const pms_module_permission = sequelize.define("pms_module_permission", {
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

    return pms_module_permission;
};