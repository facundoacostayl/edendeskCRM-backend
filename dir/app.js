"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app_routes_1 = __importDefault(require("./routes/app.routes"));
const client_routes_1 = __importDefault(require("./routes/client.routes"));
const operation_routes_1 = __importDefault(require("./routes/operation.routes"));
const app = (0, express_1.default)();
const port = 4000;
//Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(user_routes_1.default);
app.use(app_routes_1.default);
app.use(client_routes_1.default);
app.use(operation_routes_1.default);
exports.default = app;
