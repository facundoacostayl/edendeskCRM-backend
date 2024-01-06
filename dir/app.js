"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_route_1 = require("./routes/index.route");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 4000;
exports.port = port;
//Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/api/2.0", index_route_1.router);
app.use("/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
