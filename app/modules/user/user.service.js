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
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("./user.model"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = payload;
    const result = yield user_model_1.default.create({
        name,
        email,
        password,
        role: "moderator",
    });
    return result;
});
const getAllUser = (email, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, searchTerm } = query;
    const filters = {};
    if (status) {
        filters.status = status;
    }
    if (searchTerm) {
        filters.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
        ];
    }
    const result = yield user_model_1.default.find(Object.assign({ email: { $ne: email } }, filters));
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield user_model_1.default.findById(id).select("name email _id");
    if (!isExit) {
        throw new Error("User not found");
    }
    return isExit;
});
const changeUserStatus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield user_model_1.default.findById(payload.id);
    if (!isExit) {
        throw new Error("User not found");
    }
    yield user_model_1.default.findByIdAndUpdate(isExit._id, {
        status: payload === null || payload === void 0 ? void 0 : payload.status,
    });
    return true;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExit = yield user_model_1.default.findById(id);
    if (!isExit) {
        throw new Error("User not found");
    }
    yield user_model_1.default.findByIdAndDelete(id);
    return true;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload === null || payload === void 0 ? void 0 : payload.password) {
        payload.password = yield bcrypt_1.default.hash(payload.password, 12);
    }
    const user = yield user_model_1.default.findByIdAndUpdate(id, payload);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
exports.UserServices = {
    createUser,
    getAllUser,
    changeUserStatus,
    deleteUser,
    getSingleUser,
    updateUser,
};
