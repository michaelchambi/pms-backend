const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/permissions/sub_module_action");

router.post("/api/submoduleAction/addAction", [authJwt.verifyToken], controller.addAction);
router.get("/api/submoduleAction/submoduleAction", [authJwt.verifyToken], controller.findAll);
router.get("/api/submoduleAction/submoduleAction/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/api/submoduleAction/editAction/:id", [authJwt.verifyToken], controller.editAction);
router.post("/api/submoduleAction/activateAction", [authJwt.verifyToken], controller.activate);
router.post("/api/submoduleAction/deactivateAction", [authJwt.verifyToken], controller.deactivate);

module.exports = router;