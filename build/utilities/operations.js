"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gray = exports.crop = exports.resize = exports.getImage = void 0;
var get_1 = __importDefault(require("./images/get"));
exports.getImage = get_1.default;
var resize_1 = __importDefault(require("./images/resize"));
exports.resize = resize_1.default;
var crop_1 = __importDefault(require("./images/crop"));
exports.crop = crop_1.default;
var gray_1 = __importDefault(require("./images/gray"));
exports.gray = gray_1.default;
