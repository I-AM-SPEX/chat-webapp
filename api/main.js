import express from "express";
import "dotenv/config";
import { connectToCluster } from "./src/config/db.js";
import { router as authRoute } from "./src/route/public/auth_route.js";
import { router as chatRoute } from "./src/route/private/chat_route.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const BASE_URI = process.env.BASE_URI;
console.log(BASE_URI);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(`${BASE_URI}/auth`, authRoute);
app.use(`${BASE_URI}/chat`, chatRoute);
app.listen(PORT, async () => {
  let mongoClient;
  try {
    mongoClient = await connectToCluster(DB_URI);
  } catch (error) {
  } finally {
    await mongoClient.close();
    console.log("Connection closed succesfully");
  }
});
