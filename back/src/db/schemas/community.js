import pkg from "mongoose";
const { Schema, model } = pkg;

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
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		likedUser: {
			type: Array,
			default: [],
		},
		saveFileName: {
			type: String,
		},
		saveFilePath: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

export const Community = model("Community", CommunitySchema);
