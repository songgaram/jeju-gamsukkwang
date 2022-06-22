import { userModel, tourModel } from "../db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { privateKey } from '../config/jwt'

import * as Joi from 'joi'
import { joiPassword } from "joi-password";
import { idValidator } from '../validators'

class UserService {
	// 회원 정보 찾기 기능
	static findUser = async ({ userId }) => {
		// userId의 유효성 체크
		await idValidator.validateAsync(userId)

		const foundUser = await userModel.findById({ userId });

		if (!foundUser) {
			throw new Error("system.error.noUser");
		}

		const user = await userModel.findById({ userId });
		return user;
	};

	// 회원 등록 기능
	static addUser = async ({ email, password, nickname }) => {
		// 데이터의 유효성 체크
		const registerValidator = Joi.object({
			email: Joi.string().trim().empty().email({ minDomainSegments: 2 }).required(),
			password: joiPassword.string().noWhiteSpaces().min(8).required(),
			nickname: Joi.string().trim().empty().min(2).required(),
		})
		await registerValidator.validateAsync({ email, password, nickname })

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
		const newUser = { 
			id, 
			email, 
			hashedPassword, 
			nickname
		};

		// db에 저장
		const createdNewUser = await userModel.create({ newUser });

		return createdNewUser;
	};

	// 회원 로그인 기능
	static loginUser = async ({ email, password }) => {
		// 데이터의 유효성 체크
		const loginValidator = Joi.object({
			email: Joi.string().trim().empty().required(),
			password: joiPassword.string().noWhiteSpaces().min(8).required(),
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

		if (!privateKey) {
			throw new Error("system.error.noPrivateKey");
		}

		const token = jwt.sign({ userId: id }, privateKey, {
			algorithm: 'RS256',
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

	// 회원 탈퇴 기능
	static withdrawUser = async ({ userId }) => {
		// 데이터의 유효성 체크
		await idValidator.validateAsync(userId)

		const user = await userModel.findById({ userId });

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

	//회원 수정 기능
	static setUser = async ({ userId, toUpdate }) => {
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

	// 프로필 이미지 변경 기능
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

	// 회원 스탬프 추가 기능
	static addStamp = async ({ userId, tourId }) => {
		// 데이터 유효성 체크
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

	static addExp = async ({ userId, point }) => {
		const dataValidator = Joi.object({
			userId: Joi.string().trim().empty().required(),
			point: Joi.number().min(-100).max(100).empty().required()
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
