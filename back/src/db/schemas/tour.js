import pkg from "mongoose";
const { Schema, model } = pkg;

const TourSchema = new Schema({
	id: {
		type: String,
		unique: true,
		index: true,
		required: true,
	},
	krTitle: {
		type: String,
	},
	address: {
		type: String,
	},
	description: {
		type: String,
	},
	image: {
		type: String,
	},
	phoneNo: {
		type: String,
		index: true,
	},
	likeCount: {
		type: Number,
		default: 0,
		index: true,
	},
	likedUsers: {
		type: Array,
		default: [],
	},
});

export const Tour = model("Tour", TourSchema);
