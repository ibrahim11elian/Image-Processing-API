"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// response with image url
function getImage(req, res) {
    // checking is image exist or not
    if (fs_1.default.existsSync(path_1.default.resolve("assets/images/".concat(req.query.fname, ".jpg")))) {
        res.status(200).json({
            cod: 200,
            msg: 'image found',
            url: "http://".concat(req.get('host'), "/images/").concat(req.query.fname, ".jpg"),
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
