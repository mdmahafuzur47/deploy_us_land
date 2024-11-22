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
exports.resizeImg = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const single = (des) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (!req.file) {
                return next();
            }
            const filePath = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
            const readFile = fs_1.default.readFileSync(filePath);
            yield (0, sharp_1.default)(readFile)
                .webp({ quality: 75 })
                .toFile(filePath + ".webp");
            yield fs_1.default.unlinkSync(filePath);
            const path = `${des + "/" + ((_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.filename) + ".webp"}`;
            if (path) {
                // @ts-expect-error skip
                req.file.op = path;
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
const multiple = (des) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.files) {
            return next();
        }
        const files = req === null || req === void 0 ? void 0 : req.files;
        for (const file of files) {
            try {
                const filePath = file === null || file === void 0 ? void 0 : file.path;
                const readFile = fs_1.default.readFileSync(filePath);
                yield (0, sharp_1.default)(readFile)
                    .webp({ quality: 75 })
                    .toFile(filePath + ".webp");
                yield fs_1.default.unlinkSync(filePath);
                const path = `${des + "/" + (file === null || file === void 0 ? void 0 : file.filename) + ".webp"}`;
                if (path) {
                    file.op = path;
                }
            }
            catch (err) {
                next(err);
                return;
            }
        }
        next();
    });
};
exports.resizeImg = {
    single,
    multiple,
};
