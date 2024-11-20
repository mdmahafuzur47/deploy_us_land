"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const land_service_1 = require("./land.service");
// upload Land Data Into DB
const uploadLandData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.uploadLandData(req.body);
    res.status(200).json({
        success: true,
        message: "Land data uploaded successfully",
        data: result,
    });
}));
// get all Lands Data Into DB
const getAllLandsData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.getAllLandsData();
    res.status(200).json({
        success: true,
        message: "All land data fetched successfully",
        data: result,
    });
}));
// delete Land Data From DB By Id
const deleteLandsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.deleteLandsById(req.params.id);
    res.status(200).json({
        success: true,
        message: "Land data deleted successfully",
        data: result,
    });
}));
// Upload Thumbnail Image
const uploadThumbnail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.uploadThumbnail(req.file, req.body);
    res.status(200).json({
        success: true,
        message: "Thumbnail uploaded successfully",
        data: result,
    });
}));
// get Thumbnail from id
const getThumbnailById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield land_service_1.LandService.getThumbnailById((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id);
    res.status(200).json({
        success: true,
        message: "Thumbnail fetched successfully",
        data: result,
    });
}));
// get Archive from id
const getArchiveById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield land_service_1.LandService.getArchiveById((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id);
    res.status(200).json({
        success: true,
        message: "Archive fetched successfully",
        data: result,
    });
}));
// upload archive Images
const uploadArchiveImages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req === null || req === void 0 ? void 0 : req.files;
    if (!files) {
        res.status(400).json({
            success: false,
            message: "No files uploaded",
        });
        return;
    }
    const paths = files === null || files === void 0 ? void 0 : files.map((file) => file === null || file === void 0 ? void 0 : file.op);
    const result = yield land_service_1.LandService.uploadArchiveImages(paths, req.body);
    res.status(200).json({
        success: true,
        message: "Archive images uploaded successfully",
        data: result,
    });
}));
// Property Water Types
const createPropertyWaterTypes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.createPropertyWaterTypes(req.body);
    res.status(201).json({
        success: true,
        message: "Property and Water Types created successfully",
        data: result,
    });
}));
// get all Properties Water Types
const getAllPropertyWaterTypes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.getAllPropertyWaterTypes();
    res.status(200).json({
        success: true,
        message: "All Property and Water Types fetched successfully",
        data: result,
    });
}));
// delete Property Water Types
const deletePropertyWaterTypes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.deletePropertyWaterTypes(req.params.id);
    res.status(200).json({
        success: true,
        message: "Property and Water Types deleted successfully",
        data: result,
    });
}));
// delete Single Archive Image
const deleteSingleArchiveImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.deleteSingleArchiveImage(req.body);
    res.status(200).json({
        success: true,
        message: "Single archive image deleted successfully",
        data: result,
    });
}));
const getAllSingleLandData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_service_1.LandService.getAllSingleLandData(req.params.id);
    res.status(200).json({
        success: true,
        message: "All single land data fetched successfully",
        data: result,
    });
}));
exports.LandController = {
    uploadThumbnail,
    getThumbnailById,
    uploadArchiveImages,
    getArchiveById,
    createPropertyWaterTypes,
    getAllPropertyWaterTypes,
    deletePropertyWaterTypes,
    uploadLandData,
    getAllLandsData,
    deleteLandsById,
    deleteSingleArchiveImage,
    getAllSingleLandData,
};
