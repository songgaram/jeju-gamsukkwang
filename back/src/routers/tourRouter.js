import { loginRequired } from "../middlewares/loginRequired";
import { tourService } from "../services/tourService";

import { Router } from "express";
import is from "@sindresorhus/is";

const tourRouter = Router();

// 랜드마크 정보 GET
tourRouter.get("/tour", async (req, res, next) => {
	try {
		if (is.emptyObject(req.query)) {
			throw new Error("system.error.noTitle");
		}

		const { name } = req.query;

		const landmark = await tourService.getLandmark({ name });

		res.status(200).send(landmark);
	} catch (err) {
		next(err);
	}
});

export { tourRouter };
