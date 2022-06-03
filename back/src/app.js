import { userRouter } from "./routers/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import express from "express";
import cors from "cors";

const app = express();
const { swaggerUi, specs } = require("./modules/swagger");

// default app.use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// swagger api
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs, { explorer: true })
);

// routers
app.use(userRouter);

// error Middleware
app.use(errorMiddleware);

export { app };
