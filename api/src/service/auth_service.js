import { ObjectId } from "mongodb";
import { User } from "../model/user.js";
import { addUserToDb } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const createUser = async (userName, password) => {
  try {
    const id = new ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(id, userName, hashedPassword);
    await addUserToDb(user);
  } catch (error) {
    console.error("Failed to add user to db", error);
  }
};

const authenticateUser = async (password, user) => {
  const passwordStatus = await bcrypt.compare(password, user.password);
  if (passwordStatus) {
    const tokens = {};
    tokens.accessToken = jwt.sign({ userName: user.userName }, JWT_SECRET, {
      expiresIn: "1h",
    });

    tokens.refreshToken = jwt.sign({ userName: user.userName }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return { status: true, message: "LoggedIn Successfully", tokens };
  } else {
    return { status: false, message: "Incorrect Password" };
  }
};

export { createUser, authenticateUser };
