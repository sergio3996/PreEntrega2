import config from "../config/config.js";
import UserMongoDbDao from "../dao/user.mongodb.dao.js";
import { generateToken, isValidPassword } from "../utils/utils.js";

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
      const token = generateToken(user);
      return token;
    }
    const user = await UserMongoDbDao.getByEmail(email);
    if (!user) {
      throw new Error("Email o Contraseña invalidos");
    }
    if (!isValidPassword(user, password)) {
      throw new Error("Email o Contraseña invalidos");
    }
    const token = generateToken(user);
    return token;
  }
}
