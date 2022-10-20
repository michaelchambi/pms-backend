const express = require('express');
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/users/room");

router.post("/api/room/addRoom", [authJwt.verifyToken], controller.addRoom);
router.post("/api/room/editRoom/:id", [authJwt.verifyToken], controller.edit);
router.get("/api/room", [authJwt.verifyToken], controller.findAll);
router.get("/api/room/show/:id", [authJwt.verifyToken], controller.findOne);
router.post("/api/room/activateRoom", [authJwt.verifyToken], controller.activate);
router.post("/api/room/deactivateRoom", [authJwt.verifyToken], controller.deactivate);
router.post("/api/room/deleteRoom", [authJwt.verifyToken], controller.delete);

module.exports = router;