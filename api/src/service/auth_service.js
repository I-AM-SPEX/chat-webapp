import { ObjectId } from "mongodb";
import { User } from "../model/user.js";
import { addUserToDb } from "../config/db.js";
import bcrypt from "bcrypt";

const DB_URI = process.env.DB_URI;
const createUser = async (userName, password) => {
  try {
    const id = new ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(id, userName, hashedPassword);
    await addUserToDb(DB_URI, user);
  } catch (error) {
    console.error("Failed to add user to db", error);
  }
};

export { createUser };
