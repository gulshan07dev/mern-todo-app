import { config } from "dotenv"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

config({path: './.env'})

const app = express();
app.use(express.json());
app.use(cors({ origin: [process.env.CLIENT_URL!], credentials: true }));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes";
import todoRouter from "./routes/todo.routes";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

// error middleware
import errorMiddleware from "./middleware/error.middleware";
app.use(errorMiddleware);

export default app;
