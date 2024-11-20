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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const encryption_1 = require("../../utils/bcrypt/encryption");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "moderator"],
        default: "moderator",
    },
    profilePhoto: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active",
    },
}, {
    timestamps: true,
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        try {
            const hashPass = yield (0, encryption_1.hash)(user.password);
            user.password = hashPass;
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
