const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const fileUpload = require("express-fileupload");
const data = require("./app/models");
const initial = require("./app/controllers/app_config/initial_value");

// =============================================================================
// DATABASE TABLE CREATION
// =============================================================================

//  data.sequelize.sync({ force: true }).then((result) => {
//  initial.initial_values();
//      console.log(result, 'Table created...');
//  }).catch((err) => {
//      console.log(err, "Table creation failed..");
// });




data.sequelize
  .sync({ alter: true })
 .then((result) => {
    console.log(result, "Table & data created...");
 })
 .catch((err) => {
    console.log(err, "Table creation failed..");
  });
////////
// data.sequelize.sync().then((result) => {
//     console.log(result, 'Table created...');
// }).catch((err) => {
//     console.log(err, "Table creation failed..");
// });

// =============================================================================
// CORS CONFIGURATION
// =============================================================================
var whitelist = ["http://localhost:4200", "http://localhost:4300","http://example2.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// =============================================================================
// parse requests of content-type - application/x-www-form-urlencoded & JSON
// =============================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  })
);

// =============================================================================
// Welcome Route
// =============================================================================
const route = require("./app/routes/user-routes/router");
const auth = require("./app/routes/user-routes/auth");
const role = require("./app/routes/user-routes/roles");
const profile = require("./app/routes/user-routes/profile");
const floor = require("./app/routes/user-routes/department");
const office = require("./app/routes/user-routes/room");
const user = require("./app/routes/user-routes/user");
const category = require("./app/routes/project-routes/pms_project_category");
// =============================================================================
// Permission Route
// =============================================================================
const appmodule = require("./app/routes/permission-routes/modules");
const submodule = require("./app/routes/permission-routes/sub_modules");
const submoduleAction = require("./app/routes/permission-routes/sub_module_action");
const permission = require("./app/routes/permission-routes/role_permissions");

// =============================================================================
// App config Route
// =============================================================================
const app_config = require("./app/routes/app-routes/app_config");

// =============================================================================
// App GUI Route
// =============================================================================
const gui=require("./app/routes/gui-routes/menu");
app.use("/pms-center", route);
app.use("/pms-center", auth);
app.use("/pms-center", profile);
app.use("/pms-center", office);
app.use("/pms-center", role);
app.use("/pms-center", floor);
app.use("/pms-center", user);
app.use("/pms-center", appmodule);
app.use("/pms-center", submodule);
app.use("/pms-center", submoduleAction);
app.use("/pms-center", permission);
app.use("/pms-center", app_config);
app.use("/pms-center", category);
// =============================================================================
// set port, listen for requests
// =============================================================================
const PORT = process.env.PORT;
// const PORT = 4300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
