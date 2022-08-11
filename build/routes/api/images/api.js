"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageOperations_1 = __importDefault(require("../../../utilities/imageOperations"));
var route = express_1.default.Router();
route.get("/", imageOperations_1.default);
exports.default = route;
