"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandRoute = void 0;
const express_1 = require("express");
const land_controller_1 = require("./land.controller");
const upload_1 = require("../../middlewares/img_uplaod/upload");
const resizeImg_1 = require("../../middlewares/img_uplaod/resizeImg");
const router = (0, express_1.Router)();
const thumbnailDes = "/media/land/thumbnails";
const archiveDes = "/media/land/archives";
// Thumbnails Images Upload Routes
router.get("/thumbnail", land_controller_1.LandController.getThumbnailById);
// Archive image get
router.get("/archive", land_controller_1.LandController.getArchiveById);
// get properties and water types
router.get("/property-water-types", land_controller_1.LandController.getAllPropertyWaterTypes);
// Get All Land Data Types
router.get("/", land_controller_1.LandController.getAllLandsData);
// Get Single Land Data Types
router.get("/:id", land_controller_1.LandController.getAllSingleLandData);
// upload Land Data Route
router.post("/", land_controller_1.LandController.uploadLandData);
// Delete Land Data Route
router.delete("/:id", land_controller_1.LandController.deleteLandsById);
// Delete Single Archive Image
router.delete("/archive/single", land_controller_1.LandController.deleteSingleArchiveImage);
// delete property water types
router.post("/property-water-types/:id", land_controller_1.LandController.deletePropertyWaterTypes);
router.post("/thumbnail", (0, upload_1.upload)(thumbnailDes).single("img"), resizeImg_1.resizeImg.single(thumbnailDes), land_controller_1.LandController.uploadThumbnail);
// Archive Images routes
router.post("/archive", (0, upload_1.upload)(archiveDes).array("img"), resizeImg_1.resizeImg.multiple(archiveDes), land_controller_1.LandController.uploadArchiveImages);
// Property Water Types routes
router.post("/property-water-types", land_controller_1.LandController.createPropertyWaterTypes);
exports.LandRoute = router;
