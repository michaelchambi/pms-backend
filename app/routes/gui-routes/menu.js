const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/gui/home");
// const auth = require("../../controllers/users/auth");

// app.use(function(req, res, next) {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
// });

router.get("/api/home", controller.findAll);
// router.get("/api/users/show/:id", [authJwt.verifyToken], controller.findOne);
// router.get("/api/users/profile/show/:id", [authJwt.verifyToken], controller.UserProfile);
// router.get("/api/users/profiles", [authJwt.verifyToken], controller.AllUserProfile);
// router.get("/api/users/roles/show/:id", [authJwt.verifyToken], controller.UserRoles);
// router.post("/api/users/edit/:id", [authJwt.verifyToken], controller.EditUser);
// router.post("/api/users/deactivate", [authJwt.verifyToken], controller.DeactivateUser);
// router.post("/api/users/activate", [authJwt.verifyToken], controller.ActivateUser);
// router.post("/api/users/resetPassword", [authJwt.verifyToken], auth.ResetPassword);
// router.post("/api/users/delete", [authJwt.verifyToken], controller.DeleteUser);
// router.get("/api/users/checkToken", auth.checkToken)

module.exports = router;