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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyWaterType = exports.ArchiveLand = exports.ThumbnailLand = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// ThumbnailLand Schema
const ThumbnailLandSchema = new mongoose_1.Schema({
    imageUrl: { type: String, required: true },
});
// ArchiveLand Schema
const ArchiveLandSchema = new mongoose_1.Schema({
    fileUrls: [{ type: String, required: true }],
});
// Property And Water Type
const PropertyWaterTypeSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    type: { type: String, required: true },
});
const LandSchema = new mongoose_1.Schema({
    listingTitle: {
        type: String,
        required: true,
        unique: true,
    },
    house: {
        type: Object,
        default: null,
    },
    propertyType: { type: [String], required: true },
    amenities: { type: [String], required: true },
    waterType: { type: [String], required: true },
    landPrice: {
        type: String,
        required: true,
    },
    landMisId: {
        type: String,
        required: true,
    },
    acres: {
        type: String,
        required: true,
    },
    sizeInSqFt: {
        type: String,
        required: true,
    },
    referenceName: {
        type: String,
        required: true,
    },
    externalListingLinks: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    drivingDirections: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "blocked",
    },
    listingType: {
        forSale: {
            type: Boolean,
            default: false,
        },
        auctions: {
            type: Boolean,
            default: false,
        },
    },
    landImages: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "ThumbnailLand" },
    landArchives: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "ArchiveLand" },
}, {
    timestamps: true,
});
const Land = (0, mongoose_1.model)("Land", LandSchema);
exports.ThumbnailLand = mongoose_1.default.model("ThumbnailLand", ThumbnailLandSchema);
exports.ArchiveLand = mongoose_1.default.model("ArchiveLand", ArchiveLandSchema);
exports.PropertyWaterType = mongoose_1.default.model("PropertyWaterType", PropertyWaterTypeSchema);
exports.default = Land;
