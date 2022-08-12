"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./routes/api/images"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = require("path");
exports.app = (0, express_1.default)();
var port = process.env.PORT || 3000;
// using morgan middleware for logging information
exports.app.use((0, morgan_1.default)('tiny'));
// using CORS to let the client talk to server without security interruption
exports.app.use((0, cors_1.default)());
exports.app.get('/', function (req, res) {
    res.send('hello, world!');
});
// using images folder as static to return the url of the image if we want
exports.app.use('/images', express_1.default.static((0, path_1.resolve)("assets/images")));
// routes
exports.app.use('/api/images', images_1.default);
// start server
if (!module.parent) {
    exports.app.listen(port, function () {
        return console.log("app is running on http://localhost:".concat(port));
    });
}
