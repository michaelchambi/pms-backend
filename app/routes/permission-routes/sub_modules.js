const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/permissions/sub_module");

router.post("/api/submodule/addSubModule/:id", [authJwt.verifyToken], controller.addSubModule);
router.get("/api/submodule/submodule", [authJwt.verifyToken], controller.findAll);
router.get("/api/submodule/submodule/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/api/submodule/editSubModule/:id", [authJwt.verifyToken], controller.editSubModule);
router.post("/api/submodule/activateSubModule", [authJwt.verifyToken], controller.activate);
router.post("/api/submodule/deactivateSubModule", [authJwt.verifyToken], controller.deactivate);
router.get("/api/submodule/submodule-action/:id", [authJwt.verifyToken], controller.submoduleAction);

module.exports = router;