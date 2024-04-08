import config from "../config/config.js";
import UserMongoDbDao from "../dao/user.mongodb.dao.js";
import UserDTO from "../dto/user.dto.js";
import {
  createHash,
  generateRecoveryToken,
  generateToken,
  isValidPassword,
} from "../utils/utils.js";
import jwt from "jsonwebtoken";

export default class AuthService {
  static async login(data) {
    const { email, password } = data;

    if (email === config.adminEmail && password === config.adminPassword) {
      const user = {
        _id: "adminId",
        first_name: "Coder",
        last_name: "House",
        email,
        age: "&&",
        password: config.adminPassword,
        role: "admin",
      };
      const token = generateToken(new UserDTO(user));
      return token;
    }

    const user = await UserMongoDbDao.getByEmail(email);
    if (!user) {
      throw new Error("Email o Contraseña invalidos");
    }
    if (!isValidPassword(user, password)) {
      throw new Error("Email o Contraseña invalidos");
    }
    user.last_connection = new Date();
    user.save();
    const token = generateToken(new UserDTO(user));
    return token;
  }

  static async forgotPassword(email) {
    const user = await UserMongoDbDao.getByEmail(email);
    if (!user) {
      throw new Error("No existe un usuario con ese email");
    }
    const token = generateRecoveryToken(email);
    return token;
  }

  static async resetPassword(token, password) {
    let email;
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        throw new Error("Token inválido o expirado");
      }
      email = decoded.email;
    });
    const user = await UserMongoDbDao.getByEmail(email);
    if (isValidPassword(user, password)) {
      throw new Error("No se puede colocar la misma contraseña");
    }
    let passwordHashed = createHash(password);
    user.password = passwordHashed;
    await UserMongoDbDao.update(email, user);
  }
}
