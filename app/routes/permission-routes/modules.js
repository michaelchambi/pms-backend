const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/permissions/modules");

router.post("/api/module/addModule", [authJwt.verifyToken], controller.addModule);
router.get("/api/module/module", [authJwt.verifyToken], controller.findAll);
router.get("/api/module/module/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/api/module/editModule/:id", [authJwt.verifyToken], controller.editModule);
router.post("/api/module/activateModule", [authJwt.verifyToken], controller.activate);
router.post("/api/module/deactivateModule", [authJwt.verifyToken], controller.deactivate);
router.get("/api/module/module-submodule/:id", [authJwt.verifyToken], controller.submodules);


module.exports = router;