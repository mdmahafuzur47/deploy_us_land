"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.get("/user", auth_controller_1.AuthController.getUserInfo);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
router.post("/logout", auth_controller_1.AuthController.logoutUser);
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
exports.AuthRouter = router;
