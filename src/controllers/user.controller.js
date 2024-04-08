import UserService from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const token = await UserService.create(req.body);
    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: false,
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteInactiveUsers = async (req, res) => {
  try {
    await UserService.deleteInactiveUsers();
    return res.status(204).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const { uid } = req.params;
  try {
    await UserService.deleteById(uid);
    res.status(204).json("Usuario eliminado");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
