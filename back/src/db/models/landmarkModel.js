import { Landmark } from "../schemas/landmark";

export const landmarkModel = {
	findByEnTitle: async ({ enTitle }) => {
		const landmark = await Landmark.findOne({ enTitle });
		return landmark;
	},
};
