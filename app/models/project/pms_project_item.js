module.exports = (sequelize, Sequelize) => {
  const pms_item = sequelize.define("pms_project_item", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    projectName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    projectManager: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    projectFile: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return pms_item;
};
