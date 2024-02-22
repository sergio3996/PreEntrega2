import UserService from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const token = await UserService.create(req.body);
    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .redirect("/products");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const changeUserRole = async (req, res) => {
  const { uid } = req.params;
  try {
    await UserService.changeRole(uid);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
