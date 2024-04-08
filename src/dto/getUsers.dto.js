export default class getUsersDTO {
  constructor(user) {
    this._id = user._id;
    this.fullname = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.role = user.role;
  }
}
