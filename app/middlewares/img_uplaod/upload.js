"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const upload = (des) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path_1.default.join(__dirname, `../../../public${des}`);
            if (!fs_1.default.existsSync(uploadPath)) {
                fs_1.default.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        },
    });
    return (0, multer_1.default)({
        storage: storage,
    });
};
exports.upload = upload;
