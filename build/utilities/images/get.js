"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var resize_1 = require("./resize");
// response with image url
function getImage(req, res) {
    // checking is image exist or not
    if ((0, resize_1.imageExist)(path_1.default.resolve("assets/images/".concat(req.query.fname)))) {
        var format = (0, resize_1.imageExist)(path_1.default.resolve("assets/images/".concat(req.query.fname))).split('.');
        res.status(200).json({
            cod: 200,
            msg: 'image found',
            url: "http://".concat(req.get('host'), "/images/").concat(req.query.fname, ".").concat(format[format.length - 1]),
        });
    }
    else {
        res.status(404).json({
            cod: 404,
            msg: 'image not found',
        });
    }
}
exports.default = getImage;
