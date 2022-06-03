// import { router } from xxx
import { userRouter } from "./routers/userRouter";

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

app.use(userRouter);

export { app };
