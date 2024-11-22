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
exports.GalleryService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const gallery_model_1 = __importDefault(require("./gallery.model"));
/* eslint-disable @typescript-eslint/no-explicit-any */
const uploadImg = (files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const file of files) {
            yield gallery_model_1.default.create({
                path: file === null || file === void 0 ? void 0 : file.op,
            });
        }
        const result = yield gallery_model_1.default.find();
        return result;
    }
    catch (err) {
        for (const file of files) {
            const deletePath = path_1.default.join(__dirname, `../../../public${file === null || file === void 0 ? void 0 : file.op}`);
            if (fs_1.default.existsSync(deletePath)) {
                fs_1.default.unlinkSync(deletePath);
            }
        }
        console.log(err);
        throw new Error(`Could not upload!`);
    }
});
const getAllImages = (status) => __awaiter(void 0, void 0, void 0, function* () {
    if (status === "all") {
        return yield gallery_model_1.default.find();
    }
    const filters = status ? { status } : {};
    const result = yield gallery_model_1.default.find(filters).sort({ createdAt: -1 });
    return result;
});
const changeStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExits = yield gallery_model_1.default.findById(id);
    if (!isExits) {
        throw new Error("Image not found");
    }
    yield gallery_model_1.default.findOneAndUpdate(isExits === null || isExits === void 0 ? void 0 : isExits._id, {
        status: isExits.status === "show" ? "hide" : "show",
    });
});
const deleteSingleImg = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExits = yield gallery_model_1.default.findById(payload._id);
    if (!isExits) {
        throw new Error("Image not found");
    }
    const deletePath = path_1.default.join(__dirname, `../../../public${isExits.path}`);
    if (fs_1.default.existsSync(deletePath)) {
        fs_1.default.unlinkSync(deletePath);
    }
    yield gallery_model_1.default.findByIdAndDelete(payload._id);
});
exports.GalleryService = {
    uploadImg,
    getAllImages,
    changeStatus,
    deleteSingleImg,
};
