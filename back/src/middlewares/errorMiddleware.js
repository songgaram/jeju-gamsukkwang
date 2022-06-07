const errorMiddleware = (error, req, res, next) => {
	const errorMessage = {
		errormessage: error.message,
	};
	res.status(400).json(errorMessage);
};

export { errorMiddleware };
