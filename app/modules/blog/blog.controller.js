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
exports.BlogController = void 0;
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const blog_service_1 = require("./blog.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(req.body.data);
    const blog = yield blog_service_1.BlogService.createBlog(data, req.file);
    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        data: blog,
    });
}));
const getAllBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_service_1.BlogService.getAllBlog(req.query);
    res.status(200).json({
        success: true,
        message: "All blogs Get successfully",
        data: blogs,
    });
}));
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_service_1.BlogService.getSingleBlog(req.params.id);
    res.status(200).json({
        success: true,
        message: "Single blog Get successfully",
        data: blog,
    });
}));
const changeBlogStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_service_1.BlogService.changeBlogStatus(req === null || req === void 0 ? void 0 : req.body);
    res.status(200).json({
        success: true,
        message: "Blog status updated successfully",
    });
}));
const deleteBlogData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_service_1.BlogService.deleteBlogData(req.params.id);
    res.status(200).json({
        success: true,
        message: "Blog deleted successfully",
    });
}));
const updateBlogData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = JSON.parse(req.body.data);
    yield blog_service_1.BlogService.updateBlogData(req.params.id, updateData, req.file);
    res.status(200).json({
        success: true,
        message: "Blog Updated successfully",
    });
}));
exports.BlogController = {
    createBlog,
    getAllBlog,
    changeBlogStatus,
    deleteBlogData,
    getSingleBlog,
    updateBlogData,
};
