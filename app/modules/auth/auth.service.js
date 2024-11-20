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
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = require("bcrypt");
const user_model_1 = __importDefault(require("../user/user.model"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.default.findOne({
        email: payload.email,
    });
    if (!userData) {
        throw new Error("Invalid email or password");
    }
    if (userData.status === "blocked") {
        throw new Error("User account is blocked");
    }
    const isMatchPassword = yield (0, bcrypt_1.compare)(payload === null || payload === void 0 ? void 0 : payload.password, userData === null || userData === void 0 ? void 0 : userData.password);
    if (!isMatchPassword) {
        throw new Error("User account does not match");
    }
    const jwtPayload = {
        email: userData.email,
        role: userData.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt.access_secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const getUserInfo = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decode = yield jsonwebtoken_1.default.verify(token, config_1.default.jwt.access_secret);
    if (!decode) {
        throw new Error("Invalid token");
    }
    const userData = yield user_model_1.default.findOne({ email: decode === null || decode === void 0 ? void 0 : decode.email }).select("name email role status profilePhoto");
    if (!userData) {
        throw new Error("User not found");
    }
    return userData;
});
const refreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtPayload = {
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        role: payload === null || payload === void 0 ? void 0 : payload.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt.access_secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
exports.AuthService = {
    loginUser,
    getUserInfo,
    refreshToken,
};
