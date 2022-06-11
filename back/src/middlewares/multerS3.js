import dotenv from "dotenv";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import moment from "moment";

dotenv.config();
// 프론트 단에서 axios에 header: {"content-type": "multipart/form-data"}
// 컨텐츠 타입을 명시해줘야 한다!
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const storage = multerS3({
	s3: s3,
	acl: "public-read",
	bucket: process.env.AWS_S3_BUCKET,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	key: (req, file, cb) => {
		console.log("file", file);
		let ext = file.mimetype.split("/")[1];
		const dateTime = moment().format("YYYYMMDDHHmmss");
		cb(
			null,
			`${dateTime}_${Math.floor(Math.random() * 10000).toString()}_${
				file.originalname
			}.${ext}`
		);
	},
});

const s3Single = () => {
	const limits = {
		fileSize: 5242880, //5MB
	};

	const upload = multer({
		storage: storage,
		limits,
	}).single("imgFile");

	return upload;
};

const s3Array = () => {
	const limits = {
		fileSize: 5242880 * 2, //10MB
	};

	const upload = multer({
		storage: storage,
		limits,
	}).array("imgFile");

	return upload;
};

module.exports = { s3Single, s3Array };
