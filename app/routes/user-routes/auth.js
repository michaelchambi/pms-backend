const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/users/auth");

router.post("/api/auth/signup", [authJwt.checkUserExistance], controller.signup);
router.post("/api/auth/activateAccount", controller.ActivateAccount);
router.post("/api/auth/resetPassword", controller.ResetPassword);
router.post("/api/auth/changePassword", controller.ChangePassword);
router.post("/api/auth/signin", controller.signin);



module.exports = router;