const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/users/roles");

router.post("/api/role/addRoles", [authJwt.verifyToken], controller.addRoles);
router.post("/api/role/editRoles/:id", [authJwt.verifyToken], controller.edit);
router.get("/api/role", [authJwt.verifyToken], controller.findAll);
router.get("/api/role/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/api/role/activateRole", [authJwt.verifyToken], controller.activate);
router.post("/api/role/deactivateRole", [authJwt.verifyToken], controller.deactivate);
router.post("/api/role/deleteRole", [authJwt.verifyToken], controller.delete);

module.exports = router;