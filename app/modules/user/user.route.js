"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get("/getAll", user_controller_1.UserController.getAllUser);
router.get("/:id", user_controller_1.UserController.getSingleUser);
router.post("/change-status", user_controller_1.UserController.changeUserStatus);
router.post("/", (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), user_controller_1.UserController.createUser);
router.delete("/:id", user_controller_1.UserController.deleteUser);
router.put("/:id", user_controller_1.UserController.updateUser);
exports.UserRouter = router;
