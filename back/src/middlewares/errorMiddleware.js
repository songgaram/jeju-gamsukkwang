const errorMiddleware = (error, req, res, next) => {

	const errorMessage = {
		errormessage: error.message,
	};

	if (errorMessage === "system.error.unAuthorized") {
		res.status(401).json(errorMessage);
	}

	res.status(400).json(errorMessage);
};

export { errorMiddleware };
