import {
  userRouter,
  getLandmark,
  tourRouter,
  reviewRouter,
  communityRouter,
} from "./routers/";
import { errorMiddleware, badRequest } from "./middlewares/";
import { swaggerUi, specs } from "./swagger/";

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
  swaggerUi.setup(specs, { explorer: true }),
);

// routers
app.use(userRouter);
app.use(getLandmark);
app.use(tourRouter);
app.use(communityRouter);
app.use(reviewRouter);

// error Middleware
app.use(errorMiddleware);

// 404 notFound (잘못된 주소로 요청시)
app.use(badRequest);

export { app };
