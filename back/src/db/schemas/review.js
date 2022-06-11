import pkg from "mongoose";
const { Schema, model } = pkg;

const ReviewSchema = new Schema(
	{
		id: {
			type: String,
			index: true,
			unique: true,
			required: true,
		},
		tourId: {
			type: String,
			required: true,
			index: true,
		},
		userId: {
			type: String,
			required: true,
			index: true,
		},
		userNickName: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			default: 0,
			required: true,
			index: true,
		},
		saveFileName: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

export const Review = model("Review", ReviewSchema);
