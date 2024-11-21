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
exports.UserController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.createUser(req.body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error skip
    const email = req.user.email;
    const users = yield user_service_1.UserServices.getAllUser(email, req.query);
    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
    });
}));
const changeUserStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_service_1.UserServices.changeUserStatus(req.body);
    res.status(200).json({
        success: true,
        message: "User status changed successfully",
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_service_1.UserServices.deleteUser(req.params.id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.getSingleUser(req.params.id);
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.updateUser(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
    });
}));
exports.UserController = {
    createUser,
    getAllUser,
    changeUserStatus,
    deleteUser,
    getSingleUser,
    updateUser,
};
