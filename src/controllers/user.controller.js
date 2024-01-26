import UserService from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    await UserService.create(req.body);
    return res.status(201).redirect("/products");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
