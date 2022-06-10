import { userRouter } from "./routers/userRouter";
import { getLandmark } from "./routers/getLandmark";
import { tourRouter } from "./routers/tourRouter";
import { reviewRouter } from "./routers/reviewRouter";
import { communityRouter } from "./routers/communityRouter";
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
app.use(tourRouter);
app.use(communityRouter);
app.use(reviewRouter);

// error Middleware
app.use(errorMiddleware);

export { app };
