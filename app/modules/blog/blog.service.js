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
exports.BlogService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const path_1 = __importDefault(require("path"));
const blog_model_1 = __importDefault(require("./blog.model"));
const fs_1 = __importDefault(require("fs"));
const createBlog = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(file === null || file === void 0 ? void 0 : file.op)) {
            throw new Error("Blog Image not found!");
        }
        const data = Object.assign(Object.assign({}, payload), { img: file.op });
        const result = yield blog_model_1.default.create(data);
        return result;
    }
    catch (err) {
        const deletePath = path_1.default.join(__dirname, `../../../public${file === null || file === void 0 ? void 0 : file.op}`);
        if (fs_1.default.existsSync(deletePath)) {
            fs_1.default.unlinkSync(deletePath);
        }
        if (err === null || err === void 0 ? void 0 : err.message.startsWith("E11000 duplicate")) {
            throw new Error("Duplicate Blog title");
        }
        throw new Error("Failed to upload file");
    }
});
const getAllBlog = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, searchTerm } = query;
    const filters = {};
    if (status) {
        filters.status = status;
    }
    if (searchTerm) {
        filters.title = { $regex: searchTerm, $options: "i" };
    }
    const result = yield blog_model_1.default.find(filters);
    return result;
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield blog_model_1.default.findById(id);
    if (!isExit) {
        throw new Error("Blog not found");
    }
    return isExit;
});
const changeBlogStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield blog_model_1.default.findById(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!isExists) {
        throw new Error("Blog not found");
    }
    yield blog_model_1.default.findByIdAndUpdate(isExists === null || isExists === void 0 ? void 0 : isExists._id, { status: payload === null || payload === void 0 ? void 0 : payload.status });
    return true;
});
const deleteBlogData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield blog_model_1.default.findById(id);
    if (!isExists) {
        throw new Error("Blog not found");
    }
    const deleteBlogImgPath = path_1.default.join(__dirname, `../../../public${isExists === null || isExists === void 0 ? void 0 : isExists.img}`);
    if (fs_1.default.existsSync(deleteBlogImgPath)) {
        fs_1.default.unlinkSync(deleteBlogImgPath);
    }
    yield blog_model_1.default.findByIdAndDelete(id);
    return true;
});
const updateBlogData = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield blog_model_1.default.findById(id);
    if (!isExists) {
        throw new Error("Blog not found");
    }
    if (file === null || file === void 0 ? void 0 : file.op) {
        const deletePath = path_1.default.join(__dirname, `../../../public${isExists === null || isExists === void 0 ? void 0 : isExists.img}`);
        if (fs_1.default.existsSync(deletePath)) {
            fs_1.default.unlinkSync(deletePath);
        }
        payload.img = file.op;
    }
    try {
        yield blog_model_1.default.findByIdAndUpdate(isExists === null || isExists === void 0 ? void 0 : isExists._id, payload);
        return true;
    }
    catch (err) {
        const deletePath = path_1.default.join(__dirname, `../../../public${file === null || file === void 0 ? void 0 : file.op}`);
        if (fs_1.default.existsSync(deletePath)) {
            fs_1.default.unlinkSync(deletePath);
        }
        if (err === null || err === void 0 ? void 0 : err.message.includes("E11000 duplicate")) {
            throw new Error("Duplicate Blog title");
        }
        throw new Error("Failed to update blog");
    }
});
exports.BlogService = {
    createBlog,
    getAllBlog,
    changeBlogStatus,
    deleteBlogData,
    getSingleBlog,
    updateBlogData,
};
