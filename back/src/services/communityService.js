import { v4 as uuidv4 } from "uuid";

import { db, userModel, communityModel } from "../db";

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

  static addArticle = async ({
    loginUserId, 
    title, content, head
  }) => {
    const user = await userModel.findById({ userId: loginUserId })
    const writerNickName = user.nickname 
    const id = uuidv4()

    const newArticle = { 
      id,
      writerId: loginUserId,
      writerNickName,
      title,
      content,
      head
    }

    const createdNewArticle = await communityModel.create({ newArticle })
    return createdNewArticle
  }

  // 본인 리뷰만 수정 가능
  static setArticle = async ({ 
    loginUserId, 
    articleId, 
    toUpdate
  }) => {
    const currentArticle = await communityModel.findById({ articleId })
console.log(currentArticle)
    if(!currentArticle) {
      throw new Error("system.error.noArticle")
    }

    const writerId = currentArticle.writerId

    //현재 로그인한 사용자와 리뷰 작성자가 같아야 수정 가능
    if(writerId === loginUserId){
      const updatedArticle = await communityModel.update({ articleId, data: toUpdate })
      return updatedArticle
    }
    else{
      throw new Error("system.error.notEqualWithWriter")
    }
  }

  static getArticle = async ({ articleId }) => {
    const article = await communityModel.findById({ articleId })

    if(!article) {
      throw new Error("system.error.noArticle")
    }

    return article
  }
  
}

export { communityService };
