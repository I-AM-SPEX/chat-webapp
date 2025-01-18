import express from "express";
import "dotenv/config";
import { connectToCluster } from "./src/config/db.js";
import { router as authRoute } from "./src/route/public/auth_route.js";
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRoute);
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
