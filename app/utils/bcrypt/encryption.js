"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
exports.compare = compare;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = (data) => {
    return bcrypt_1.default.hashSync(data, 12);
};
exports.hash = hash;
function compare(data, hashData) {
    return bcrypt_1.default.compareSync(data, hashData);
}
