module.exports = (sequelize, Sequelize) => {
    const pms_project_category = sequelize.define("pms_project_category", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

       categoryName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },

        

        categoryIcon:{
            type: Sequelize.STRING,
            allowNull: false,
        },

        status: {
            type: Sequelize.INTEGER,
            allowNull: false,

        }
    });

    return pms_project_category;
};