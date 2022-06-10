import { v4 as uuidv4 } from "uuid";

import { db, communityModel } from "../db";

class communityService {
	static getArticles = async ({ getArticles }) => {
		if (!getArticles.head) {
			const result = await communityModel.findAll({ getArticles });

			if (!result) {
				throw new Error("system.error.noArticles");
			}

			return result;
		} else if (getArticles.head) {
			const result = await communityModel.findHead({ getArticles });

			if (!result) {
				throw new Error("system.error.noArticles");
			}

			return result;
		}
	};

	static deleteArticle = async ({ articleId }) => {
		const article = communityModel.findById({ articleId });

		if (!article) {
			throw new Error("system.error.noArticle");
		}

		try {
			const deleteResult = await communityModel.deleteById({ articleId });
			if (!deleteResult) {
				throw new Error("system.error.fail");
			}

			return "system.success";
		} catch (err) {
			throw new Error("system.error.fail");
		}
	};
}

export { communityService };
