"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var operations_1 = require("../../../utilities/operations");
// route genrator
var route = express_1.default.Router();
// respond with image url
route.get('/', operations_1.getImage);
// respond with resized image
route.get('/resize', operations_1.resize);
// respond with croped image
route.get('/crop', operations_1.crop);
// respond with grayscale image
route.get('/gray', operations_1.gray);
// respond with blured image
route.get('/blur', operations_1.bluri);
exports.default = route;
