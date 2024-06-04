import { UserModel, Users } from "../models/user.model";

export default {
  async getUsers() {
    return await UserModel.query();
  },
  async getUserByEmail(email: any) {
    return await UserModel.query().where("email", email);
  },
  async createUser(args: Users) {
    await UserModel.query().insert(args);
  },
};
