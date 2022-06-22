import { ReviewService } from "./reviewService";
import "dotenv/config";
import { MongoClient } from "mongodb";

const DB_URL = process.env.MONGODB_URL;
const mockUserId = "840b5c0f-a165-4010-9309-53663c873e72";

describe("Review MVP Test : 정상 작동 시", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("jest");
  });

  afterAll(async () => {
    await connection.close();
    if (db.close) {
      await db.close();
    }
  });
});
