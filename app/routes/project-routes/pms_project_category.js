const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/project/pms_project_category");

// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "/welcome.html");
// });
//[authJwt.verifyToken]

router.post("/api/project_category/addCategory", [authJwt.verifyToken], controller.addCategory);
router.get("/api/project_category", [authJwt.verifyToken], controller.findAll);
router.post("/api/project_category/show", [authJwt.verifyToken], controller.findOne);
router.post("/api/project_category/editProject/", [authJwt.verifyToken], controller.editCategory);
router.post("/api/project_category/editCategoryIcon/", [authJwt.verifyToken], controller.editCategoryIcon);
router.post("/api/project_category/activate", [authJwt.verifyToken], controller.activate);
router.post("/api/project_category/deactivate", [authJwt.verifyToken], controller.deactivate);
router.get("/api/project_category/categoryFile/:name", controller.download);
router.get("/api/mobile/project_category", controller.mobile_findAll);
router.get("/api/mobile/project_category/show/:id", controller.mobile_findOne);

module.exports = router;
