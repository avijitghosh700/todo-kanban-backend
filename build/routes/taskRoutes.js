"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskService_1 = __importDefault(require("../services/taskService"));
const taskRoutes = (app, express) => {
    let tasks = express.Router();
    tasks.post("/add", async (req, res) => {
        let response = await taskService_1.default.add(req.body);
        res.status(response.status).json(response.data);
    });
    tasks.put("/update", async (req, res) => {
        let response = await taskService_1.default.update(req.body);
        res.status(response.status).json(response.data);
    });
    tasks.delete("/delete", async (req, res) => {
        const { id } = req.query;
        let response = await taskService_1.default.delete(id);
        res.status(response.status).json(response.data);
    });
    tasks.get("/getAllTasks", async (req, res) => {
        let response = await taskService_1.default.getAllTasks();
        res.status(response.status).json(response.data);
    });
    return tasks;
};
exports.default = taskRoutes;
