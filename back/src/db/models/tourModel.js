import { Landmark } from "../schemas/landmark";

export const tourModel = {
	findByEnTitle: async ({ enTitle }) => {
		const landmark = await Landmark.findOne({ enTitle });
		return landmark;
	},

	isLandmarkExist: async ({ enTitle }) => {
		const isLandmarkExist = await Landmark.exists({ enTitle });

		return isLandmarkExist ? false : true;
	},
};
