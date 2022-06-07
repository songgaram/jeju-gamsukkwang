import { userRouter } from "./routers/userRouter";
import { getLandmark } from "./routers/getLandmark";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { swaggerUi, specs } from "./swagger/swagger";

import express from "express";
import cors from "cors";

const app = express();

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
app.use(getLandmark);

// error Middleware
app.use(errorMiddleware);

export { app };
