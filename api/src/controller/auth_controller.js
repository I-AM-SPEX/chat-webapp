import { findUserByUserName } from "../config/db.js";
import { createUser } from "../service/auth_service.js";

const signUp = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (userName && password) {
      const user = await findUserByUserName(userName);
      if (!user) {
        await createUser(userName, password);
        res.status(200).json({ message: "Account created succesfully" });
      } else {
        res.status(200).json({ message: "userName already exists." });
      }
    } else {
      res.status(200).json({ message: "Fields cant be empty" });
    }
  } catch (error) { }
};

const login = async (req, res) => { };

export { signUp, login };
