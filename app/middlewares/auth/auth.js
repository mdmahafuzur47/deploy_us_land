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
exports.softCheckLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = __importDefault(require("../../modules/user/user.model"));
const softCheckLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.refreshToken || req.headers.accessToken || null;
        if (!token) {
            return next();
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt.refresh_secret);
        if (!verifyToken) {
            return next();
        }
        const user = yield user_model_1.default.findOne({
            email: verifyToken === null || verifyToken === void 0 ? void 0 : verifyToken.email,
        }).select("name email role status profilePhoto");
        if (!user) {
            return next();
        }
        // @ts-expect-error skip
        req.user = user;
        return next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ success: false, message: "Unauthorized" });
        return next();
    }
});
exports.softCheckLogin = softCheckLogin;
