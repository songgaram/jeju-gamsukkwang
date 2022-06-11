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
		landmarkId: {
			type: String,
			required: true,
			index: true,
		},
		writerId: {
			type: String,
			required: true,
			index: true,
		},
		writerNickName: {
			type: String,
			required: true,
			index: true,
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
