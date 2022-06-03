import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema(
	{
		id: {
      type: String,
      required: true,
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
			default: "None",
		},
		auth: {
			type: Array,
			default: []
		},
	},
	{
		timestamps: true,
	}
);

export const User = model("User", UserSchema);
  