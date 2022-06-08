import { db, tourModel } from "../db";

class tourService {
	static getLandmark = async ({ name }) => {
		const isLandmarkExist = await tourModel.isLandmarkExist({ enTitle: name });
		if (!isLandmarkExist) {
			throw new Error("system.error.noLandmark");
		}

		const landmark = await tourModel.findByEnTitle({ enTitle: name });

		return landmark;
	};
}

export { tourService };
