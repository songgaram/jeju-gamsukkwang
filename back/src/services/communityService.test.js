import { CommunityService } from "./communityService";
import "dotenv/config";
import { MongoClient } from "mongodb";

const DB_URL = process.env.MONGODB_URL;

describe("insert", () => {
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
