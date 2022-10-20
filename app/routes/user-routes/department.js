const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/users/department");

router.post("/api/department/addFloor", [authJwt.verifyToken], controller.addFloor);
router.post("/api/department/editFloor/:id", [authJwt.verifyToken], controller.edit);
router.get("/api/department/floor", [authJwt.verifyToken], controller.findAll);
router.get("/api/department/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/api/department/activateFloor", [authJwt.verifyToken], controller.activate);
router.post("/api/department/deactivateFloor", [authJwt.verifyToken], controller.deactivate);
router.post("/api/department/deleteFloor", [authJwt.verifyToken], controller.delete);

module.exports = router;