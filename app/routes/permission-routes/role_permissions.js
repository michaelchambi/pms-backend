const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/permissions/role_permission");

router.get("/api/permission/permissions", [authJwt.verifyToken], controller.permissions);
router.get("/api/permission/role-permission/:id", [authJwt.verifyToken], controller.rolePermissions);
router.post("/api/permission/updatePermission", [authJwt.verifyToken], controller.updatePermissions);
router.post("/api/permission/show-module-permission", [authJwt.verifyToken], controller.showModulePermissions);
router.post("/api/permission/show-submodule-permission", [authJwt.verifyToken], controller.showSubPermissions);
router.post("/api/permission/show-action-permission", [authJwt.verifyToken], controller.showActionPermissions);

module.exports = router;