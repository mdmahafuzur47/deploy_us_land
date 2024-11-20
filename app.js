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
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = require("./app/middlewares/notFound");
const auth_1 = require("./app/middlewares/auth/auth");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// Security Middleware (Helmet)
app.use(helmet_1.default.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
//cors
app.use((0, cors_1.default)({
    // origin: "http://localhost:3000",
    origin: "https://us-frontend.vercel.app",
    credentials: true,
}));
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// soft Check and store user Data
app.use(auth_1.softCheckLogin);
// routes
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: "Welcome to the API",
        version: "1.0.0",
        author: "Md Mahafuzur Rahaman",
    });
}));
// All Routes
app.use("/api/v1", routes_1.default);
// Global Error Handler
app.use(globalErrorHandler_1.globalErrorHandler);
//Not Found Error Handler
app.use(notFound_1.notFound);
exports.default = app;
