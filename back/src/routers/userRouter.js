import is from "@sindresorhus/is";

import { Router } from "express";
import { UserService } from "../services/UserService";
import { loginRequired } from "../middlewares/";
import { s3Single } from "../middlewares/multerS3";

const userRouter = Router();

// 회원 정보 가져오기 기능
userRouter.get("/account/:id", async (req, res, next) => {
	try {
		if (is.emptyObject(req.params)) {
			throw new Error("system.error.badRequest");
		}

		const userId = req.params.id;

		const user = await UserService.findUser({ userId });

		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
});

// 회원 등록 기능 (프로필 이미지는 기본 이미지로 설정됨)
userRouter.post("/account/register", async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

		// req에서 데이터 가져오기
		const { email, password, nickname } = req.body;

		// 데이터를 유저 db에 추가하기
		const newUser = await UserService.addUser({
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
userRouter.post("/account/login", async (req, res, next) => {
	try {
		// req에서 데이터 가져오기
		const { email, password } = req.body;

		// 위 데이터로 DB 검색
		const user = await UserService.loginUser({ email, password });

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
		const user = await UserService.withdrawUser({ userId });

		res.status(200).send(user);
	} catch (err) {
		next(err);
	}
});

//회원 수정 기능
userRouter.put("/user", loginRequired, async (req, res, next) => {
	try {
		// req에서 데이터 가져오기
		const userId = req.currentUserId;
		const toUpdate = req.body;

		const updatedUser = await UserService.setUser({ userId, toUpdate });

		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
});

// 회원 스탬프 추가 기능
userRouter.post("/user/stamp", loginRequired, async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

		const userId = req.currentUserId;
		const { tourId } = req.body;

		const tourIntoStamp = await UserService.addStamp({
			userId,
			tourId,
		});

		res.status(201).json(tourIntoStamp);
	} catch (err) {
		next(err);
	}
});

// exp(경험치) 증가시키기
userRouter.post("/user/exp", loginRequired, async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error("system.error.badRequest");
		}

		const { point } = req.body;
		const userId = req.currentUserId;
		const upgradeUser = await UserService.addExp({ userId, point });

		res.status(201).json(upgradeUser);
	} catch (err) {
		next(err);
	}
});

// 프로필 이미지 변경
userRouter.put(
	"/user/profileImg",
	loginRequired,
	s3Single(),
	async (req, res, next) => {
		try {
			const userId = req.currentUserId;

			const { location } = req.file;
			const imageName = location.split("amazonaws.com/")[1];
			const toUpdate = { profileImgUrl: imageName };

			const updatedUser = await UserService.setUser({ userId, toUpdate });

			res.status(201).json(updatedUser);
		} catch (err) {
			next(err);
		}
	}
);

export { userRouter };
