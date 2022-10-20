module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("tblusers", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            firstname: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            lastname: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            fullname: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },

            phone: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false,

            },

            code: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            status: {
                type: Sequelize.INTEGER,
                allowNull: false,

            },

            creator: {
                type: Sequelize.INTEGER,
                allowNull: false
            }


        }

    );

    return Users;
};