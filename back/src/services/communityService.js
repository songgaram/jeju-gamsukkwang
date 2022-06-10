import { v4 as uuidv4 } from "uuid";

import { db, userModel, communityModel } from "../db";

class communityService {

  static addArticle = async ({
    loginUserId, 
    title, content
  }) => {
    const user = await userModel.findById({ userId: loginUserId })
    const writerNickName = user.nickname 
    const id = uuidv4()

    const newArticle = { 
      id,
      writerId: loginUserId,
      writerNickName,
      title,
      content
    }

    const createdNewArticle = await communityModel.create({ newArticle })
    return createdNewArticle
  }

  
}

export { communityService };
