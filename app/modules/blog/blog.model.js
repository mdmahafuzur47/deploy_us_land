"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "blocked", "pending"],
        default: "pending",
    },
}, {
    timestamps: true,
});
const Blog = (0, mongoose_1.model)("Blog", BlogSchema);
exports.default = Blog;
