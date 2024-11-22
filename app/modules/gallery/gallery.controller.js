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
exports.GalleryController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const gallery_service_1 = require("./gallery.service");
const uploadImg = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const result = yield gallery_service_1.GalleryService.uploadImg(files);
    res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: result,
    });
}));
const getAllImages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield gallery_service_1.GalleryService.getAllImages((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.status);
    res.status(200).json({
        success: true,
        message: "Images retrieved successfully",
        data: result,
    });
}));
const changeStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield gallery_service_1.GalleryService.changeStatus(id);
    res.status(200).json({
        success: true,
        message: "Image status changed successfully",
    });
}));
const deleteSingleImg = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield gallery_service_1.GalleryService.deleteSingleImg(req.body);
    res.status(200).json({
        success: true,
        message: "Image deleted successfully",
    });
}));
exports.GalleryController = {
    uploadImg,
    getAllImages,
    changeStatus,
    deleteSingleImg,
};
