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
exports.AuthController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const auth_service_1 = require("./auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.loginUser(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        path: "/",
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            token: accessToken,
        },
    });
}));
const getUserInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || null;
    if (!token) {
        throw new Error("Invalid token");
    }
    const result = yield auth_service_1.AuthService.getUserInfo(token);
    res.status(200).json({
        success: true,
        message: "User info fetched successfully",
        data: result,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken || null;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Refresh token not found",
        });
        return;
    }
    const decode = jsonwebtoken_1.default.verify(token, config_1.default.jwt.refresh_secret);
    if (!token) {
        res.status(404).json({
            success: false,
            message: "Refresh token not found",
        });
        return;
    }
    const result = yield auth_service_1.AuthService.refreshToken(decode);
    res.status(200).json({
        success: true,
        message: "Generate Access Token Successfully",
        data: result,
    });
}));
const logoutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
}));
exports.AuthController = {
    loginUser,
    getUserInfo,
    refreshToken,
    logoutUser,
};
