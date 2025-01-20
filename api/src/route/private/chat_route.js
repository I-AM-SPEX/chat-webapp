import express from "express";
import { newChat, newMessage } from "../../controller/chat_controller.js";

const router = express.Router();

router.post("/newChat", newChat);
router.post("/newMessage", newMessage);
export { router };
