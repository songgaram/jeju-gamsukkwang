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
			throw new Error("system.error.duplicatedEmail");
		}

		// 닉네임 중복 확인
		const isNicknameExist = await userModel.isNicknameExist({ nickname });
		if (!isNicknameExist) {
			throw new Error("system.error.duplicatedNickname");
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

	// 회원 로그인 기능
	static loginUser = async ({ email, password }) => {
		// 이메일로 회원이 DB에 있는지 확인
		const user = await userModel.findByEmail({ email });

		// 해당 회원이 없을 경우 error
		if (!user) {
			throw new Error("system.error.noUser");
		}

		// 비밀번호 일치 여부 확인
		const passwordFromDB = user.hashedPassword;
		const isPasswordSame = await bcrypt.compare(password, passwordFromDB);

		// 비밀번호가 일치하지 않을 경우 Error
		if (!isPasswordSame) {
			throw new Error("system.error.differentPassword");
		}

		// 로그인 성공 => jwt 생성
		const secretKey = process.env.JWT_SECRET_KEY;
		if (!secretKey) {
			throw new Error("system.error.noSecretKey");
		}
		const token = jwt.sign({ userId: user.id }, secretKey, {
			expiresIn: "1 days",
		});

		// loginUser 객체에 반환할 데이터 설정
		const { id, nickname } = user;

		const loginUser = {
			token,
			id,
			email,
			nickname,
		};

		return loginUser;
	};

	// 회원 탈퇴 기능
	static withdrawUser = async ({ userId }) => {
		// 유저 ID로 DB에 있는 회원 정보 확인
		console.log(userId);
		const user = await userModel.findById({ userId });

		// 해당 회원이 없을 경우 error
		if (!user) {
			throw new Error("system.error.noUser");
		}

		try {
			const withdrawResult = await userModel.deleteById({ userId });
			if (!withdrawResult) {
				throw new Error("system.error.fail");
			}

			return "system.success";
		} catch (err) {
			throw new Error("system.error.fail");
		}
	};

	static countUser = async () => {
		const userCounts = await userModel.countUsers()
		return userCounts
	}
}

export { userService };
