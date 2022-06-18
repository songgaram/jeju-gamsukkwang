import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		id: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		nickname: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		stamp: {
			type: [String],
			default: [],
		},
		experience: {
			type: Number,
			default: 0,
		},
		profileImgUrl: {
			type: String,
			default: "undefined",
		},
	},
	{
		timestamps: true,
	}
);

export const User = model("User", UserSchema);
