import mongoose from "mongoose";
import { userModel } from "./models/userModel";
import { tourModel } from "./models/tourModel";

const DB_URL = process.env.MONGODB_URL || "MongoDB 서버 주소를 설정해주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () => console.log(`MongoDB 연결 성공 : ${DB_URL}`));
db.on("error", (err) =>
	console.error(`MongoDB 연결 실패 : ${DB_URL}` + "\n" + err)
);

export { userModel };
export { tourModel };
export { db };
