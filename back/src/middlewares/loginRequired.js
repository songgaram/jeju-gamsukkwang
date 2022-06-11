import jwt from "jsonwebtoken";

const loginRequired = async (req, res, next) => {
	// request 헤더로부터 authorization bearer 토큰을 받음.
	const userToken = req.headers["authorization"]?.split(" ")[1];

	// 토큰이 없을 경우, 로그인된 사용자만 사용할 수 있는 서비스로의 접근을 제한
	if (!userToken) {
		res.status(400).send("system.error.noToken");
		return;
	}

	// 해당 token이 정상적인 token인지 확인하기 위해 토큰에 담긴 userId 정보 추출
	try {
		const secretKey = process.env.JWT_SECRET_KEY;
		const jwtDecoded = jwt.verify(userToken, secretKey);
		const userId = jwtDecoded.userId;

		req.currentUserId = userId;
		next();
	} catch (err) {
		res.status(400).send("system.error.unvalidToken");
		return;
	}
};

export { loginRequired };
