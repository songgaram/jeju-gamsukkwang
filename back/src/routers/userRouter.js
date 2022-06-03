import is from "@sindresorhus/is";

import { Router } from "express";
import { userService } from "../services/userService";

const userRouter = Router();

userRouter.post("/user/register", async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("Content-type을 application/json으로 설정");
		}

		// req에서 데이터 가져오기
		const email = req.body.email;
		const password = req.body.password;
		const nickname = req.body.nickname;

		// 데이터를 유저 db에 추가하기
		const newUser = await userService.addUser({
			email,
			password,
			nickname,
		});

		if (newUser.errorMessage) {
			throw new Error(newUser.errorMessage);
		}

		res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
});

export { userRouter };
