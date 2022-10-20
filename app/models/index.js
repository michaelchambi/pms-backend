const config = require("../config/database");
const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD,{
    host: config.HOST,
    dialect:"postgres",
    pool:{
        max: 5,
        min: 0,
        acquare: 30000,
        idle: 10000,
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// =============================================================================
// DATABASE TABLE eChinese
// =============================================================================
db.users = require("../models/users/users")(sequelize, Sequelize);
db.pms_profile = require("./users/pms_profile")(sequelize, Sequelize);
db.pms_roles = require("./users/pms_roles")(sequelize, Sequelize);
db.user_roles = require("../models/users/user_roles")(sequelize, Sequelize);
db.user_profiles = require("../models/users/user_profile")(sequelize, Sequelize);

// =============================================================================
// DATABASE TABLE Room
// =============================================================================

db.pms_department = require("./office/pms_department")(sequelize, Sequelize);
db.pms_rooms = require("./office/pms_rooms")(sequelize, Sequelize);


// =============================================================================
// DATABASE TABLE Language
// =============================================================================
db.pms_project_item = require("./project/pms_project_item")(sequelize, Sequelize);
db.pms_project_category = require("./project/pms_project_category")(sequelize, Sequelize);

// =============================================================================
// DATABASE TABLE PERMISSIONS
// =============================================================================
db.pms_modules = require("./permissions/pms_modules")(sequelize, Sequelize);
db.pms_sub_modules = require("./permissions/pms_sub_modules")(sequelize, Sequelize);
db.pms_sub_module_action = require("./permissions/pms_sub_module_action")(sequelize, Sequelize);
db.pms_module_permission = require("./permissions/pms_module_permission")(sequelize, Sequelize);
db.pms_sub_module_permission = require("./permissions/pms_sub_module_permission")(sequelize, Sequelize);
db.pms_action_permission = require("./permissions/pms_action_permission")(sequelize, Sequelize);


// =============================================================================
// DATABASE TABLE App
// =============================================================================
db.pms_app = require("../models/app_config/pms_app")(sequelize, Sequelize);


// =============================================================================
// DATABASE TABLE RELATIONSHIP
// =============================================================================

db.pms_profile.hasMany(db.user_profiles, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_profile.hasMany(db.users, {
  foreignKey: "profileId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.users.hasMany(db.user_profiles, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_roles.hasMany(db.user_roles, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.users.hasMany(db.user_roles, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


//====================================================
// MODULE PERMISSIONS
//====================================================
db.pms_rooms.hasMany(db.user_profiles, {
  foreignKey: "roomId",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

db.pms_modules.hasMany(db.pms_sub_modules, {
  foreignKey: "moduleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_sub_modules.belongsTo(db.pms_modules, {
  foreignKey: "moduleId",
});

db.pms_modules.hasMany(db.pms_module_permission, {
  foreignKey: "moduleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_roles.hasMany(db.pms_module_permission, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//====================================================
// SUB MODULE PERMISSIONS
//====================================================
db.pms_modules.hasMany(db.pms_sub_module_permission, {
  foreignKey: "moduleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_sub_modules.hasMany(db.pms_sub_module_permission, {
  foreignKey: "sub_moduleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_roles.hasMany(db.pms_sub_module_permission, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//====================================================
// SUB MODULE ACTIONS
//====================================================
db.pms_modules.hasMany(db.pms_sub_module_action, {
  foreignKey: "moduleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_sub_modules.hasMany(db.pms_sub_module_action, {
  foreignKey: "sub_moduleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//====================================================
// SYSTEM ACTIONS PERMISSION
//====================================================

db.pms_sub_module_action.hasMany(db.pms_action_permission, {
  foreignKey: "actionId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_modules.hasMany(db.pms_action_permission, {
  foreignKey: "moduleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_sub_modules.hasMany(db.pms_action_permission, {
  foreignKey: "sub_moduleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.pms_roles.hasMany(db.pms_action_permission, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

//====================================================
// PROJECT
//====================================================
db.pms_project_category.hasMany(db.pms_project_item, {
  foreignKey: "categoryId_FK",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = db;
