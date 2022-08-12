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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropImage = void 0;
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var get_1 = require("./get");
function crop(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var width, height, left, top, format, originalImagePath, cropedPath, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    width = req.query.width;
                    height = req.query.height;
                    left = req.query.left;
                    top = req.query.top;
                    format = req.query.format;
                    originalImagePath = path_1.default.resolve("assets/images/".concat(req.query.fname));
                    cropedPath = path_1.default.resolve("assets/croped/".concat(req.query.fname, "_").concat(width, "_").concat(height, "_coord_").concat(top, "_").concat(left, ".").concat(format || 'jpg'));
                    if (width) {
                        width = Number(width);
                    }
                    if (height) {
                        height = Number(height);
                    }
                    if (left) {
                        left = Number(left);
                    }
                    if (top) {
                        top = Number(top);
                    }
                    if (!fs_1.default.existsSync(cropedPath)) return [3 /*break*/, 1];
                    res.status(200).sendFile(path_1.default.resolve(cropedPath));
                    return [3 /*break*/, 7];
                case 1:
                    if (!(0, get_1.imageExist)(originalImagePath)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, cropImage((0, get_1.imageExist)(originalImagePath), left, top, width, height, format)];
                case 3:
                    _a.sent();
                    res.status(200).sendFile(cropedPath);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    res.status(500).send('fiald to process!!');
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    res.status(404).json({
                        cod: 404,
                        msg: 'image not found',
                    });
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
// crop image and save it to croped folder
function cropImage(fpath, left, top, width, height, format) {
    return __awaiter(this, void 0, void 0, function () {
        var filename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = fpath.replace(/^.*[\\/]/, '').split('.')[0];
                    if (!(width || height)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, sharp_1.default)(fpath)
                            .extract({
                            width: width,
                            height: height,
                            left: left,
                            top: top,
                        })
                            .toFormat(format || 'jpg')
                            .toFile(path_1.default.resolve("assets/croped/".concat(filename, "_").concat(width, "_").concat(height, "_coord_").concat(top, "_").concat(left, ".").concat(format || 'jpg')))];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.cropImage = cropImage;
exports.default = crop;
