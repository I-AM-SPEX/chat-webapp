import express from "express";
import { login, signUp } from "../../controller/auth_controller.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);

export { router };
