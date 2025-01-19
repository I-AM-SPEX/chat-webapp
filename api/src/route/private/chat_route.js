import express from "express";
import { newChat, addMessage } from "../../controller/chat_controller.js";

const router = express.Router();

router.post("/newChat", newChat);
router.post("/message", addMessage);
export { router };
