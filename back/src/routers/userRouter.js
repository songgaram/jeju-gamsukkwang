import is from "@sindresorhus/is";

import { Router } from "express";
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";

const userRouter = Router();

// 회원 등록 기능
userRouter.post("/user/register", async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

		// req에서 데이터 가져오기
		const { email, password, nickname } = req.body;

		// 데이터를 유저 db에 추가하기
		const newUser = await userService.addUser({
			email,
			password,
			nickname,
		});

		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
});

// 회원 로그인 기능
userRouter.post("/user/login", async (req, res, next) => {
	try {
		// req에서 데이터 가져오기
		const { email, password } = req.body;

		// 위 데이터로 DB 검색
		const user = await userService.loginUser({ email, password });

		res.status(200).send(user);
	} catch (err) {
		next(err);
	}
});

// 회원 탈퇴 기능
userRouter.delete("/user", loginRequired, async (req, res, next) => {
	try {
		// req에서 데이터 가져오기
		const userId = req.currentUserId;

		// 위 데이터로 회원 탈퇴 시도
		const user = await userService.withdrawUser({ userId });

		res.status(200).send(user);
	} catch (err) {
		next(err);
	}
});

export { userRouter };
