import UserRepository from "../repository/userRepository";
import { Users } from "../models/user.model";

export default {
  async getUsers() {
    return await UserRepository.getUsers();
  },
  async getUserByEmail(email: any) {
    return await UserRepository.getUserByEmail(email);
  },
  async createUser(args: Users) {
    await UserRepository.createUser(args);
  },
};
