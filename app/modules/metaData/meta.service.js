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
exports.MetaDataService = void 0;
const blog_model_1 = __importDefault(require("../blog/blog.model"));
const gallery_model_1 = __importDefault(require("../gallery/gallery.model"));
const land_model_1 = __importDefault(require("../land/land.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const getTotalData = () => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.countDocuments();
    const moderator = yield user_model_1.default.countDocuments();
    const land = yield land_model_1.default.countDocuments();
    const images = yield gallery_model_1.default.countDocuments();
    return {
        blog,
        moderator,
        land,
        images,
    };
});
exports.MetaDataService = {
    getTotalData,
};
