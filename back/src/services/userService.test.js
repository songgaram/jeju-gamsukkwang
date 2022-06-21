const {MongoClient} = require('mongodb');
import "dotenv/config"

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("jest");
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { id: 'some-user-id09', name: 'Mark'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ id: 'some-user-id09'});
    expect(insertedUser).toEqual(mockUser);
  });
});