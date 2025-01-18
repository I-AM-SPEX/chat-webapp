import express from "express";
import { addFriend } from "../../controller/chat_controller.js";

const router = express.Router();

router.post("/addFriend", addFriend);

export { router };
