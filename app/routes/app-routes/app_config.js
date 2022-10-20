const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/app_config/app_config");

router.post("/api/app/addAppconfig", [authJwt.verifyToken], controller.addAppconfig);
router.get("/api/app/appconfig", [authJwt.verifyToken], controller.findAll);
router.get("/api/app/appconfig", [authJwt.verifyToken], controller.findAll);
router.get("/api/app/appconfig/show/:id", [authJwt.verifyToken], controller.findOne);
router.get("/api/app/appconfig/active", controller.activeConfig);
router.post("/api/app/editAppconfig", [authJwt.verifyToken], controller.editAppconfig);
router.post("/api/app/editAppconfig_logo", [authJwt.verifyToken], controller.editAppconfig_logo)
router.post("/api/app/activateAppconfig", [authJwt.verifyToken], controller.activate);
router.post("/api/app/deactivateAppconfig", [authJwt.verifyToken], controller.deactivate);
router.get("/storage-files/logo/:name", controller.download);


module.exports = router;