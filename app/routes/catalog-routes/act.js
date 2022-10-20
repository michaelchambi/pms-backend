const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/catalogy/act");

router.post("/api/act/addAct", [authJwt.verifyToken], controller.addAct);
router.get("/api/act", [authJwt.verifyToken], controller.findAll);
router.post("/api/act/show", [authJwt.verifyToken], controller.findOne);
router.post("/api/act/editAct/", [authJwt.verifyToken], controller.editAct);
router.post("/api/act/editActFile/", [authJwt.verifyToken], controller.editActFile);
router.post("/api/act/activate", [authJwt.verifyToken], controller.activate);
router.post("/api/act/deactivate", [authJwt.verifyToken], controller.deactivate);
router.get("/act/actFile/:name", controller.download,[authJwt.verifyToken],);
router.get("/api/mobile/act", controller.mobile_findAll);
router.get("/api/mobile/act/show/:id", controller.mobile_findOne);

module.exports = router;