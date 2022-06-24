import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Joi from "joi"
import { joiPassword } from "joi-password";

import { userModel, tourModel } from "../db";
import { privateKey } from "../config/jwt"
import { idValidator } from "../validators" // id가 혹시 비어있는지 또는 누락됐는지를 검사

class UserService {

	// 회원 등록하기
	static addUser = async ({ email, password, nickname }) => {

		const registerValidator = Joi.object({
			email: Joi.string().trim().empty().email({ minDomainSegments: 2 }).required(),
			password: joiPassword.string().noWhiteSpaces().min(8).required(), // 특수문자, 숫자, 알파벳 허용
			nickname: Joi.string().trim().empty().min(2).required(),
		})
		await registerValidator.validateAsync({ email, password, nickname })

		const isEmailExist = await userModel.isEmailExist({ email });

		if (!isEmailExist) {
			throw new Error("system.error.duplicatedEmail");
		}

		const isNicknameExist = await userModel.isNicknameExist({ nickname });

		if (!isNicknameExist) {
			throw new Error("system.error.duplicatedNickname");
		}

		const id = uuidv4();
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = { 
			id, 
			email, 
			hashedPassword, 
			nickname
		};

		const createdNewUser = await userModel.create({ newUser });

		return createdNewUser;
	};

	// 회원 정보 찾기
	static findUser = async ({ userId }) => {

		await idValidator.validateAsync(userId)

		const foundUser = await userModel.findById({ userId });

		if (!foundUser) {
			throw new Error("system.error.noUser");
		}

		const user = await userModel.findById({ userId });
		return user;
	};

	// 회원 로그인하기
	static loginUser = async ({ email, password }) => {

		const loginValidator = Joi.object({
			email: Joi.string().trim().empty().required(),
			password: joiPassword.string().noWhiteSpaces().min(8).required(), // 특수문자, 숫자, 알파벳 허용
		})
		await loginValidator.validateAsync({ email, password })

		const foundUser = await userModel.findByEmail({ email });

		if (!foundUser) {
			throw new Error("system.error.noUser");
		}

		const { id, nickname, hashedPassword } = foundUser;
		
		const isPasswordSame = await bcrypt.compare(password, hashedPassword);

		if (!isPasswordSame) {
			throw new Error("system.error.differentPassword");
		}

		const token = jwt.sign({ userId: id }, privateKey, {
			algorithm: "RS256",
			expiresIn: "24h",
		});

		const loginUser = {
			token,
			id,
			email,
			nickname,
		};

		return loginUser;
	};

	//회원 수정하기
	static setUser = async ({ userId, toUpdate }) => {

		// nickname만 수정할 수 있게 검사 (이메일, 비밀번호는 수정하면 안됨)
		const editValidator = Joi.object({
			userId: Joi.string().trim().empty().required(),
			toUpdate: Joi.object({
				nickname: Joi.string().trim().empty().min(2).required()
			}).length(1)
		})
		await editValidator.validateAsync({ userId, toUpdate })

		let user = await userModel.findById({ userId });

		if (!user) {
			throw new Error("system.error.noUser");
		}

		const isNicknameExist = await userModel.isNicknameExist({
			nickname: toUpdate.nickname,
		});

		if (!isNicknameExist) {
			throw new Error("system.error.duplicatedNickname");
		}

		user = await userModel.update({ userId, data: toUpdate });
		return user;
	};

	// 회원 탈퇴하기
	static withdrawUser = async ({ userId }) => {

		await idValidator.validateAsync(userId)

		const user = await userModel.findById({ userId });

		if (!user) {
			throw new Error("system.error.noUser");
		}

		try {
			await userModel.deleteById({ userId });

			return "system.success";
		} catch (err) {
			throw new Error("system.error.fail");
		}
	};

	// 프로필 이미지 변경하기
	static setProfileImg = async ({ userId, toUpdate }) => {

		const editValidator = Joi.object({
			userId: Joi.string().trim().empty().required(),
			toUpdate: Joi.object({
				profileImgUrl: Joi.string().trim().empty().required()
			}).length(1)
		})
		await editValidator.validateAsync({ userId, toUpdate })

		let user = await userModel.findById({ userId });

		if (!user) {
			throw new Error("system.error.noUser");
		}

		user = await userModel.update({ userId, data: toUpdate });
		return user;
	}

	// 인증한 랜드마크를 회원 스탬프에 추가하기
	static addStamp = async ({ userId, tourId }) => {

		const dataValidator = Joi.object({
			userId: Joi.string().trim().empty().required(),
			tourId: Joi.string().trim().empty().required()
		})
		await dataValidator.validateAsync({ userId, tourId })

		const foundUser = await userModel.findById({ userId });

		if (!foundUser) {
			throw new Error("system.error.noUser");
		}

		const isTourExist = await tourModel.isLandmarkExist({ id: tourId })

		if(!isTourExist) {
			throw new Error("system.error.noSuchTourId")
		}

		const isStampExist = await userModel.isStampExist({ 
			userId, 
			tourId
		});

		if (isStampExist) {
			throw new Error("system.error.alreadyStamped");
		}

		const addStamp = await userModel.addStamp({ 
			userId, 
			tourId
		});
		return addStamp;
	};

	// 회원의 exp(경험치) 증가시키기
	static addExp = async ({ userId, point }) => {

		const dataValidator = Joi.object({
			userId: Joi.string().trim().empty().required(),
			point: Joi.number().min(-100).max(100).empty().required() // 한번에 증가시킬 포인트의 허용 범위
		})
		await dataValidator.validateAsync({ userId, point })

		let user = await userModel.findById({ userId });

		if (!user) {
			throw new Error("system.error.noUser");
		}

		user = await userModel.updateExp({ 
			userId, 
			point
		});
		return user;
	};
}

export { UserService };
