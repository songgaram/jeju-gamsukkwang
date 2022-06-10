import { User } from "../schemas/user";

export const userModel = {
	create: async ({ newUser }) => {
		const createdNewUser = await User.create(newUser);
		return createdNewUser;
	},

	isNicknameExist: async ({ nickname }) => {
		const isNicknameExist = await User.exists({ nickname });
		if (isNicknameExist) {
			return false;
		}
		return true;
	},

	isEmailExist: async ({ email }) => {
		const isEmailExist = await User.exists({ email });
		if (isEmailExist) {
			return false;
		}
		return true;
	},

	findByEmail: async ({ email }) => {
		const user = await User.findOne({ email });
		return user;
	},

	findById: async ({ userId }) => {
		const user = await User.findOne({ id: userId });
		return user;
	},

	findByNickname: async ({ nickname }) => {
		const user = await User.findOne({ nickname });
		return user;
	},

	findAll: async () => {
		const users = await User.find({});
		return users;
	},

	update: async ({ userId, data }) => {
		const filter = { id: userId };
		const update = { $set: data };
		const option = { returnOriginal: false };

		const updatedUser = await User.findOneAndUpdate(filter, update, option);

		return updatedUser;
	},

	deleteById: async ({ userId }) => {
		const user = await User.deleteOne({ id: userId });
		return user;
	},

	addStamp: async ({ userId, landmarkId }) => {
		const filter = { id: userId };
		const update = {
			$push: { stamp: landmarkId },
		};
		const option = { returnOriginal: false };

		const addStamp = await User.findOneAndUpdate(filter, update, option);

		return addStamp;
	},

	isStampExist: async ({ userId, landmarkId }) => {
		const isStampExist = await User.exists({
			$and: [{ id: userId }, { stamp: landmarkId }],
		});

		return isStampExist;
	},
};
