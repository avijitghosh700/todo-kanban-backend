"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = __importDefault(require("../db/models/task.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const taskStageSetter = (status) => {
    switch (status) {
        case "TODO":
            return {
                isDone: false,
                isProgress: false,
                isTodo: true,
            };
        case "PROGRESS":
            return {
                isDone: false,
                isProgress: true,
                isTodo: false,
            };
        case "DONE":
            return {
                isDone: true,
                isProgress: false,
                isTodo: false,
            };
        default:
            return {
                isDone: false,
                isProgress: false,
                isTodo: true,
            };
    }
};
let taskService = {
    async add(data) {
        try {
            let response = await task_model_1.default.create({
                status: data.status.toUpperCase(),
                ...data,
            });
            return {
                status: http_status_codes_1.default.OK,
                data: {
                    status: true,
                    message: "Task added successfully",
                    data: {
                        id: response._id,
                        title: response.title,
                        description: response.description,
                        ...taskStageSetter(response.status),
                    },
                },
            };
        }
        catch (error) {
            return {
                status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                data: {
                    status: false,
                    message: error.message,
                },
            };
        }
    },
    async update(data) {
        try {
            let response = await task_model_1.default.updateOne({ _id: data.id }, {
                $set: {
                    title: data.title,
                    description: data.description,
                    status: data.status,
                },
                $currentDate: {
                    lastModified: true,
                },
            });
            console.log(response);
            return {
                status: http_status_codes_1.default.OK,
                data: {
                    message: "Task updated successfully.",
                },
            };
        }
        catch (error) {
            return {
                status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                data: {
                    status: false,
                    message: error.message,
                },
            };
        }
    },
    async delete(id) {
        try {
            let response = await task_model_1.default.deleteOne({ _id: id });
            return {
                status: http_status_codes_1.default.OK,
                data: {
                    message: "Task deleted successfully.",
                    success: response.acknowledged,
                },
            };
        }
        catch (error) {
            return {
                status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                data: {
                    status: false,
                    message: error.message,
                },
            };
        }
    },
    async getAllTasks() {
        try {
            const TODOS = await task_model_1.default.find({ status: "TODO" });
            const PROGRESS = await task_model_1.default.find({ status: "PROGRESS" });
            const DONE = await task_model_1.default.find({ status: "DONE" });
            return {
                status: http_status_codes_1.default.OK,
                data: {
                    success: true,
                    TODOS: TODOS.map((task) => ({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        ...taskStageSetter(task.status),
                    })),
                    PROGRESS: PROGRESS.map((task) => ({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        ...taskStageSetter(task.status),
                    })),
                    DONE: DONE.map((task) => ({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        ...taskStageSetter(task.status),
                    })),
                },
            };
        }
        catch (error) {
            return {
                status: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
                data: {
                    status: false,
                    message: error.message,
                },
            };
        }
    },
};
exports.default = taskService;
