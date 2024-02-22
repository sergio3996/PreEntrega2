import UserDao from "../dao/user.mongodb.dao.js";
import { createHash, generateToken } from "../utils/utils.js";
import CartService from "./cart.service.js";

export default class UserService {
  static async create(data) {
    const { first_name, last_name, age, email, password, role } = data;

    if (!first_name || !last_name) {
      throw new Error("Todos los campos excepto edad son requerido");
    }

    const user = await UserDao.getByEmail(email);
    if (user) {
      throw new Error("Ya existe un usuario con esas credenciales");
    }

    const cart = await CartService.create();

    let passwordHashed = createHash(password);

    let newUser = {
      first_name,
      last_name,
      email,
      age,
      password: passwordHashed,
      cart: cart._id,
      role: role,
    };

    try {
      const user = await UserDao.create(newUser);
      const token = generateToken(newUser);
      return token;
    } catch (error) {
      console.error(error.message);
    }
  }

  static async changeRole(uid) {
    const user = await UserDao.getById(uid);
    if (!user) {
      throw new Error("No se ha encontrado un usuario con ese id");
    }
    if (user.role === "user") {
      user.role = "premium";
    } else if (user.role === "premium") {
      user.role = "user";
    }
    return await UserDao.update(user.email, user);
  }
}
