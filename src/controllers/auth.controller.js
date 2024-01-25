import UserDTO from "../dto/user.dto.js";
import AuthService from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .redirect("/products");
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

export const logout = (req, res) => {
  return res.clearCookie("token").redirect("/");
};

export const current = (req, res) => {
  return res.status(200).json(new UserDTO(req.user));
};
