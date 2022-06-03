import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

import { db, userModel } from "../db";

class userService {
	// 회원 등록 기능
	static addUser = async ({ email, password, nickname }) => {
		// 이메일 중복 확인
		const isEmailExist = await userModel.isEmailExist({ email });
		if (!isEmailExist) {
			const errorMessage = "이 이메일은 현재 사용중입니다.";
			throw new Error(errorMessage);
		}

		// 비밀번호 해쉬화
		const hashedPassword = await bcrypt.hash(password, 10);

		// id에 유니크 값 부여
		const id = uuidv4();
		const newUser = { id, email, hashedPassword, nickname };

		// db에 저장
		const createdNewUser = await userModel.create({ newUser });

		return createdNewUser;
	};
}

export { userService };
