import { findUserByUserName } from "../config/db.js";
import { authenticateUser, createUser } from "../service/auth_service.js";

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
      res.status(200).json({ message: "Fields can not be empty" });
    }
  } catch (error) { }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (userName && password) {
      const user = await findUserByUserName(userName);
      if (user) {
        const result = await authenticateUser(password, user);
        if (result.status) {
          res
            .status(200)
            .cookie("refreshToken", result.tokens.refreshToken, {
              httpOnly: true,
              sameSite: "strict",
            })
            .header("Authorization", result.tokens.accessToken)
            .json({ message: result.message });
        } else {
          res.status(200).json({ message: result.message });
        }
      } else {
        res.status(200).json({ message: "You do not have an account" });
      }
    } else {
      res.status(200).json({ message: "Fields can not be empty" });
    }
  } catch (error) {
    console.log("Login Failed", error);
  }
};

export { signUp, login };
