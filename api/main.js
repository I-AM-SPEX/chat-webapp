import express from "express";
import "dotenv/config";
import { connectToCluster } from "./src/config/db.js";

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const app = express();

app.listen(PORT, async () => {
  await connectToCluster(DB_URI);
});
