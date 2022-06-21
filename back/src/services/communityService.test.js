import { CommunityService } from "./communityService";
import "dotenv/config";
import { MongoClient } from "mongodb";

const DB_URL = process.env.MONGODB_URL;

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      "mongodb+srv://admin:1234@cluster0.6alrt.mongodb.net/ai_8",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  test("1 is 1", () => {
    expect(1).toBe(1);
  });
});
