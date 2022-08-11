"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./routes/api/images"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = 3000;
app.use((0, cors_1.default)());
app.use("/api/images", images_1.default);
// using images folder as static to return the url of the image if we want
app.use("/images", express_1.default.static(path_1.default.resolve("assets/images")));
app.listen(port, function () {
    return console.log("app is running on http://localhost:".concat(port));
});
