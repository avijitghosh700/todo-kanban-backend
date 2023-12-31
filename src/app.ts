import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connectDB from "./db/connection.db";

import taskRoutes from "./routes/taskRoutes";

require("dotenv").config();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use((_req: Request, _res: Response, next: NextFunction) => {
  connectDB();
  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Task Manager API 🙂",
  });
});

// Route groups
app.use("/api/task", taskRoutes(app, express));
// END

export default app;
