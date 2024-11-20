"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.LandService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const land_model_1 = __importStar(require("./land.model"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../config"));
// upload Land Data Into DB
const uploadLandData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_model_1.default.create(payload);
    return result;
});
// get Land Data From DB
const getAllLandsData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_model_1.default.find({})
        .populate("landImages")
        .populate("landArchives");
    return result;
});
// get single land Data By User
const getAllSingleLandData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_model_1.default.findById(id)
        .populate("landImages")
        .populate("landArchives");
    return result;
});
// Delete Land By Id
const deleteLandsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield land_model_1.default.findById(id);
    if (!isExist) {
        throw new Error("Land not found");
    }
    // Deleting associated images
    if (isExist === null || isExist === void 0 ? void 0 : isExist.landImages) {
        yield deleteThumbnailImage(isExist === null || isExist === void 0 ? void 0 : isExist.landImages);
    }
    if (isExist === null || isExist === void 0 ? void 0 : isExist.landArchives) {
        yield deleteArchiveImage(isExist === null || isExist === void 0 ? void 0 : isExist.landArchives);
    }
    // Deleting the land record
    yield land_model_1.default.deleteOne({ _id: id });
});
// Delete Thumbnails Image
const deleteThumbnailImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield land_model_1.ThumbnailLand.findById(id);
    if (!isExist) {
        throw new Error("Thumbnail not found");
    }
    const publicPath = path_1.default.join(__dirname, "../../../../src/public");
    try {
        yield fs_1.default.unlinkSync(path_1.default.join(publicPath, isExist.imageUrl));
        yield land_model_1.ThumbnailLand.findByIdAndDelete(id);
    }
    catch (error) {
        console.log(error);
        throw new Error("Error while deleting thumbnail image");
    }
});
// Delete Archived Images
const deleteArchiveImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield land_model_1.ArchiveLand.findById(id);
    if (!isExist) {
        throw new Error("Archive not found");
    }
    const publicPath = path_1.default.join(__dirname, "../../../../src/public");
    try {
        if (Array.isArray(isExist.fileUrls)) {
            for (const img of isExist.fileUrls) {
                yield fs_1.default.unlinkSync(path_1.default.join(publicPath, img));
            }
        }
        yield land_model_1.ArchiveLand.findByIdAndDelete(id); // Deleting the archive record
    }
    catch (error) {
        console.log(error);
        throw new Error("Error while deleting archive images");
    }
});
// Delete Single Archive Image
const deleteSingleArchiveImage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, imageUrl, }) {
    const isExist = yield land_model_1.ArchiveLand.findById(id);
    if (!isExist) {
        throw new Error("Archive not found");
    }
    const publicPath = path_1.default.join(__dirname, "../../../../src/public");
    try {
        yield fs_1.default.unlinkSync(path_1.default.join(publicPath, imageUrl));
        isExist.fileUrls = isExist.fileUrls.filter((img) => img !== imageUrl);
        yield land_model_1.ArchiveLand.findByIdAndUpdate(id, { fileUrls: isExist.fileUrls }, { new: true });
    }
    catch (error) {
        console.log(error);
        throw new Error("Error while deleting archive image");
    }
});
// upload Thumbnail Image
const uploadThumbnail = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const thumbnailImg = file === null || file === void 0 ? void 0 : file.op;
    if (!thumbnailImg) {
        throw new Error("No thumbnail image provided");
    }
    const isExist = yield land_model_1.ThumbnailLand.findById(payload === null || payload === void 0 ? void 0 : payload.id);
    if (isExist) {
        const publicPath = config_1.default.env === "production"
            ? "/opt/render/project/src/public"
            : path_1.default.join(__dirname, "../../../../src/public");
        yield fs_1.default.unlinkSync(path_1.default.join(publicPath, isExist === null || isExist === void 0 ? void 0 : isExist.imageUrl));
        const result = yield land_model_1.ThumbnailLand.findByIdAndUpdate(isExist === null || isExist === void 0 ? void 0 : isExist._id, { imageUrl: thumbnailImg }, {
            new: true,
        });
        return result;
    }
    else {
        const result = yield land_model_1.ThumbnailLand.create({
            imageUrl: thumbnailImg,
        });
        return result;
    }
});
const getThumbnailById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new Error("Invalid thumbnail id");
    }
    const result = yield land_model_1.ThumbnailLand.findById(id);
    if (!result) {
        throw new Error("Thumbnail not found");
    }
    return result;
});
// get archive by id
const getArchiveById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new Error("Invalid Archive id");
    }
    const result = yield land_model_1.ArchiveLand.findById(id);
    if (!result) {
        throw new Error("Archive not found");
    }
    return result;
});
// upload Archive Images
const uploadArchiveImages = (files, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield land_model_1.ArchiveLand.findById(payload.id);
    if (isExist) {
        const result = yield land_model_1.ArchiveLand.findOneAndUpdate(isExist._id, {
            $push: { fileUrls: { $each: files } },
        }, {
            new: true,
        });
        return result;
    }
    else {
        const result = yield land_model_1.ArchiveLand.create({
            fileUrls: files,
        });
        return result;
    }
});
// Property Water Types
const createPropertyWaterTypes = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.title && !payload.type) {
        throw new Error("Invalid Property Water Type");
    }
    const result = yield land_model_1.PropertyWaterType.create({
        title: payload.title,
        type: payload.type,
    });
    return result;
});
const getAllPropertyWaterTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield land_model_1.PropertyWaterType.find({});
    return result;
});
const deletePropertyWaterTypes = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield land_model_1.PropertyWaterType.findById(id);
    if (!isExist) {
        throw new Error("Property Water Type not found!");
    }
    yield land_model_1.PropertyWaterType.deleteOne({ _id: isExist === null || isExist === void 0 ? void 0 : isExist._id });
    return true;
});
exports.LandService = {
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
