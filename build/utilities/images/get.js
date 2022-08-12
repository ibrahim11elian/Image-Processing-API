"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageExist = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
// response with image url
function getImage(req, res) {
    // checking is image exist or not
    if (imageExist(path_1.default.resolve("assets/images/".concat(req.query.fname)))) {
        var format = imageExist(path_1.default.resolve("assets/images/".concat(req.query.fname))).split('.');
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
// check if the original image exist with different and if so return back the whole path with format
function imageExist(originalImagePath) {
    var formats = ['jpeg', 'jpg', 'png'];
    for (var i = 0; i < formats.length; i++) {
        if ((0, fs_1.existsSync)("".concat(originalImagePath, ".").concat(formats[i]))) {
            return "".concat(originalImagePath, ".").concat(formats[i]);
        }
    }
    return false;
}
exports.imageExist = imageExist;
exports.default = getImage;
