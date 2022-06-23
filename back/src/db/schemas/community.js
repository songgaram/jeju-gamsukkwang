import { Schema, model } from "mongoose";

const CommunitySchema = new Schema(
	{
		id: {
			type: String,
			index: true,
			unique: true,
			required: true,
		},
		head: {
			type: String,
			index: true,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		userNickName: {
			type: String,
			required: true,
			index: true,
		},
		title: {
			type: String,
			required: true,
			index: true,
		},
		content: {
			type: String,
			required: true,
		},
		likedUsers: {
			type: [String],
			default: [],
			index: true,
		},
		saveFileName: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

export const Community = model("Community", CommunitySchema);
