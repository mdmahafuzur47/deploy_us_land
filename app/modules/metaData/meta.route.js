"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaDataRoute = void 0;
const express_1 = require("express");
const meta_controller_1 = require("./meta.controller");
const router = (0, express_1.Router)();
router.get("/totals", meta_controller_1.MetaDataController.getTotalData);
exports.MetaDataRoute = router;
