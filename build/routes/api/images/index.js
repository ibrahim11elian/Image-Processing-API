"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var operations_1 = require("../../../utilities/operations");
var route = express_1.default.Router();
route.get("/", operations_1.getImage);
route.get("/resize", operations_1.resize);
exports.default = route;
