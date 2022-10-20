const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/users/profile");

router.post("/api/profile/addProfile", [authJwt.verifyToken], controller.addProfile);
router.post("/api/profile/editProfile/:id", [authJwt.verifyToken], controller.edit);
router.get("/api/profile",[authJwt.verifyToken], controller.findAll);
router.get("/api/profile/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/api/profile/activateProfile", [authJwt.verifyToken], controller.activate);
router.post("/api/profile/deactivateProfile", [authJwt.verifyToken], controller.deactivate);
router.post("/api/profile/deleteProfile", [authJwt.verifyToken], controller.delete);

module.exports = router;