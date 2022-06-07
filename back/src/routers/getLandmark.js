import { Router } from "express";
import axios from "axios";
import { Landmark } from "../db/schemas/landmark";

const getLandmark = Router();

const addLandmark = async ({ title, roadaddress, introduction, image }) => {
	const newLandmark = await Landmark.create({
		krTitle: title,
		address: roadaddress,
		description: introduction,
		image,
	});
	return newLandmark;
};

getLandmark.post("/landmark", async (req, res, next) => {
	const { cid } = req.body;
	const response = await axios.get(
		`https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=ggxyk5zq6syr4q5n&locale=kr&cid=${cid}`
	);
	const { title, roadaddress, introduction } = response.data.items[0];
	const image = response.data.items[0].repPhoto.photoid.thumbnailpath;

	const newLandmark = await addLandmark({
		title,
		roadaddress,
		introduction,
		image,
	});

	res.status(201).json(newLandmark);
});

// userRouter.post("/user/register", async (req, res, next) => {
// 	try {
// 		if (is.emptyObject(req.body)) {
// 			throw new Error("system.error.badRequest");
// 		}

// 		// req에서 데이터 가져오기
// 		const { email, password, nickname } = req.body;

// 		// 데이터를 유저 db에 추가하기
// 		const newUser = await userService.addUser({
// 			email,
// 			password,
// 			nickname,
// 		});

// 		res.status(201).json(newUser);
// 	} catch (err) {
// 		next(err);
// 	}
// });

export { getLandmark };
