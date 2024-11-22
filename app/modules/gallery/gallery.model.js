"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GallerySchema = new mongoose_1.Schema({
    path: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["show", "hide"],
        default: "hide",
    },
});
const Gallery = (0, mongoose_1.model)("Gallery", GallerySchema);
exports.default = Gallery;
