"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const upload_1 = require("../../middlewares/img_uplaod/upload");
const resizeImg_1 = require("../../middlewares/img_uplaod/resizeImg");
const router = (0, express_1.Router)();
const blogDes = "/media/blog";
router.get("/", blog_controller_1.BlogController.getAllBlog);
router.get("/:id", blog_controller_1.BlogController.getSingleBlog);
router.post("/change-status", blog_controller_1.BlogController.changeBlogStatus);
router.delete("/:id", blog_controller_1.BlogController.deleteBlogData);
router.post("/", (0, upload_1.upload)(blogDes).single("img"), resizeImg_1.resizeImg.single(blogDes), blog_controller_1.BlogController.createBlog);
router.put("/:id", (0, upload_1.upload)(blogDes).single("img"), resizeImg_1.resizeImg.single(blogDes), blog_controller_1.BlogController.updateBlogData);
exports.BlogRoute = router;
