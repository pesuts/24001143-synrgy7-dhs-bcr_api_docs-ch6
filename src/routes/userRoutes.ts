import express from "express";
import {
  viewUser,
  getUsers,
  registerMember,
  loginAdmin,
  loginUser,
  registerAdmin,
} from "../controller/userController";
import { authAdmin, authSuperAdmin, authToken } from "../middleware/authToken";

const userRouter = express.Router();

userRouter.use("/me", authToken, viewUser);
userRouter.use("/register/admin", authToken, authSuperAdmin, registerAdmin);
userRouter.use("/register", registerMember);
userRouter.use("/login/admin", loginAdmin);
userRouter.use("/login", loginUser);
userRouter.use("/", authToken, authAdmin, getUsers);

export default userRouter;
