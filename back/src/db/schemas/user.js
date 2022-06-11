import pkg from "mongoose";
const { Schema, model } = pkg;

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
			type: Array,
			default: [],
		},
		exp: {
			type: Number,
			default: 0,
		},
		saveFileName: {
			type: String,
			default: "defaultProfile.jpg",
		},
	},
	{
		timestamps: true,
	}
);

export const User = model("User", UserSchema);
