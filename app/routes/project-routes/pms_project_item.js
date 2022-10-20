const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/project/pms_project_item");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.verifyToken],

router.post("/api/project_item/addProjectItem", controller.addItem);
router.post("/api/project_item/", [authJwt.verifyToken], controller.findAll);
router.post("/api/project_item/show", [authJwt.verifyToken], controller.findOne);

router.post("/api/project_item/editProjectItem", [authJwt.verifyToken], controller.editItem);
router.post("/api/project_item/editProject", [authJwt.verifyToken], controller.editSwahili);
router.post("/api/project_item/editProjectFile", [authJwt.verifyToken], controller.editImage);

router.post("/api/project_item/activate", [authJwt.verifyToken], controller.activate);
router.post("/api/project_item/deactivate", [authJwt.verifyToken], controller.deactivate);

router.get("/api/mobile/project_item/category/:categoryId", controller.mobile_findAll);
router.get("/api/mobile/project_item/show/:id", controller.mobile_findOne);

module.exports = router;
