import userModel from "../dao/models/user.model.js";

export default class UsersController {
  static getOne(email) {
    return userModel.findOne({ email });
  }

  static async create(userData) {
    try {
      const user = await userModel.create(userData);
      console.log(`Usuario creado correctamente ${user.email}`);
      return user;
    } catch (error) {
      console.error(error.message);
    }
  }
}
