import UserDao from "../dao/user.mongodb.dao.js";
import getUsersDTO from "../dto/getUsers.dto.js";
import UserDTO from "../dto/user.dto.js";
import { createHash, generateToken } from "../utils/utils.js";
import CartService from "./cart.service.js";
import emailService from "./email.service.js";

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
      last_connection: new Date(),
    };

    try {
      const user = await UserDao.create(newUser);
      const token = generateToken(new UserDTO(user));
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

  static async getAll() {
    const users = await UserDao.get();
    const usersDTO = users.map((user) => {
      return new getUsersDTO(user);
    });
    return usersDTO;
  }

  static async deleteInactiveUsers() {
    const inactiveLimit = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const users = await UserDao.get({
      last_connection: { $lt: inactiveLimit },
    });
    users.forEach(async (user) => {
      await emailService.sendMail(
        user.email,
        "Usuario Eliminado",
        `<p>Su usuario ha sido eliminado por inactividad.</p>`
      );
    });
    const result = await UserDao.deleteMany({
      last_connection: { $lt: inactiveLimit },
    });
    return result;
  }

  static async deleteById(userId) {
    const user = await UserDao.getById(userId);
    console.log(user);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return await UserDao.delete(userId);
  }
}
