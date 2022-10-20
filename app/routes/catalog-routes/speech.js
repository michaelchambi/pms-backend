const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/catalogy/speech");

// router.post("/api/speech/addSpeech", [authJwt.verifyToken], controller.addBook);
router.get("/api/speech", [authJwt.verifyToken], controller.findAll);
// router.post("/api/speech/show", [authJwt.verifyToken], controller.findOne);
// router.post("/api/speech/editSpeech/", [authJwt.verifyToken], controller.editBook);
// router.post("/api/speech/editSpeechIcon/", [authJwt.verifyToken], controller.editBookIcon);
// router.post("/api/speech/activate", [authJwt.verifyToken], controller.activate);
// router.post("/api/speech/deactivate", [authJwt.verifyToken], controller.deactivate);

// router.get("/api/mobile/speech", controller.mobile_findAll);
// router.get("/api/mobile/speech/show/:id", controller.mobile_findOne);

module.exports = router;