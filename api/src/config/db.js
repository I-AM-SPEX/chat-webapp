import { MongoClient } from "mongodb";
const DB = process.env.DB;
const USER_COLLECTION = process.env.USER_COLLECTION;
const DB_URI = process.env.DB_URI;

const getUsersCollection = (mongoClient) => {
  const db = mongoClient.db(DB);
  const collection = db.collection(USER_COLLECTION);
  return collection;
};
const connectToCluster = async () => {
  let mongoClient;
  try {
    mongoClient = new MongoClient(DB_URI);
    console.log("Connecting to Cluster");
    await mongoClient.connect();
    console.log("Successfully connected to cluster");
    return mongoClient;
  } catch (error) {
    console.error("Connection to cluseter failed"), error;
    process.exit();
  }
};

const addUserToDb = async (user) => {
  let mongoClient;

  try {
    mongoClient = await connectToCluster(DB_URI);
    const usersCollection = getUsersCollection(mongoClient);
    await usersCollection.insertOne(user);
  } catch (error) {
    console.error("failed tod add user to db", error);
  } finally {
    await mongoClient.close();
    console.log("Connection closed successfully");
  }
};

const findUserByUserName = async (userName) => {
  let mongoClient;

  try {
    mongoClient = await connectToCluster(DB_URI);
    const usersCollection = getUsersCollection(mongoClient);
    const user = await usersCollection.findOne({ userName: userName });
    return user;
  } catch (error) {
    console.error("findUserByUserName failde", error);
  } finally {
    await mongoClient.close();
    console.log("Connection closed successfully");
  }
};
export { connectToCluster, addUserToDb, findUserByUserName };
