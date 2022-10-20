const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/catalogy/book");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.verifyToken]

router.post("/api/book/addBook", [authJwt.verifyToken], controller.addBook);
router.get("/api/book", [authJwt.verifyToken], controller.findAll);
router.post("/api/book/show", [authJwt.verifyToken], controller.findOne);
router.post("/api/book/editBook/", [authJwt.verifyToken], controller.editBook);
router.post("/api/book/editBookIcon/", [authJwt.verifyToken], controller.editBookIcon);
router.post("/api/book/activate", [authJwt.verifyToken], controller.activate);
router.post("/api/book/deactivate", [authJwt.verifyToken], controller.deactivate);

router.get("/api/mobile/book", controller.mobile_findAll);
router.get("/api/mobile/book/show/:id", controller.mobile_findOne);

module.exports = router;
