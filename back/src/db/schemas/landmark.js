import pkg from "mongoose";
const { Schema, model } = pkg;

const LandmarkSchema = new Schema({
	krTitle: {
		type: String,
		index: true,
	},
	enTitle: {
		type: String,
		index: true,
	},
	address: {
		type: String,
		index: true,
	},
	description: {
		type: String,
		index: true,
	},
	image: {
		type: String,
		index: true,
	},
});

export const Landmark = model("Landmark", LandmarkSchema);
