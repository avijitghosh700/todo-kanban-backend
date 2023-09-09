"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const connection_db_1 = __importDefault(require("./db/connection.db"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((_req, _res, next) => {
    (0, connection_db_1.default)();
    next();
});
// Route groups
app.use("/api/task", (0, taskRoutes_1.default)(app, express_1.default));
// END
app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening to port: ${process.env.PORT}`);
});
