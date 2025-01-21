import express from "express";
import {
  newChat,
  newMessage,
  getChats,
} from "../../controller/chat_controller.js";

const router = express.Router();

router.post("/newChat", newChat);
router.post("/newMessage", newMessage);
router.get("/:id", getChats);
export { router };
