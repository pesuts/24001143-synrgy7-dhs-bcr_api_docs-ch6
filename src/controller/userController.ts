import {
  Request, Response,
  // NextFunction
} from "express";
import userServices from "../service/userService";
import * as bcrypt from "bcrypt";

import * as jwt from "jsonwebtoken";

const secretKey = "SECRET";
const saltRounds = 5;

const isEmptyOrWhitespace = (value: string): boolean => {
  return value.trim().length === 0;
};

async function hashPassword(password: string) {
  const hashedPassword = bcrypt.hash(password, saltRounds);

  return hashedPassword;
}

async function comparePassword(password: string, hash: string) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

export const viewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    res.status(200).send({ status: "Success", message: `Hello ${user.username}, your role is ${user.role}`, data: user });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;
    const hash = await hashPassword(password);

    await userServices.createUser({
      name,
      password: hash,
      email,
      role: "admin",
    });

    const user = await userServices.getUserByEmail(email);
    res.status(200).send({ status: "Success", message: "Registration sucess", data: user });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const registerMember = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;
    if (name === undefined || password === undefined || email === undefined) {
      res.status(401).send({ status: "Error", message: "All field must be filled!" });
      return;
    }

    if (isEmptyOrWhitespace(name)|| isEmptyOrWhitespace(password) || isEmptyOrWhitespace(email)) {
      res.status(401).send({ status: "Error", message: "All field must be filled correctly!" });
      return;
    }
    
    const hash = await hashPassword(password);
    const [user] = await userServices.getUserByEmail(email);
    if (user) {
      res.status(401).send({ status: "Error", message: "User already exist!" });
      return;
    }
    await userServices.createUser({
      name,
      password: hash,
      email,
      role: "user",
    });
    const createdUser = await userServices.getUserByEmail(email);
    res.status(200).send({ status: "Success", message: "Registration sucess", data: createdUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send({
      message: "Internal server error",
      // error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const [user] = await userServices.getUserByEmail(email);
    if (!user) {
      res.status(401).send({ status: "Error", message: "User not found!" });
      return;
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).send({ status: "Error", message: "Wrong password!" });
      return;
    }
    const token = jwt.sign(
      { id: user.id, username: user.email, role: user.role, name: user.name },
      secretKey,
      { expiresIn: "1d" }
    );
    res.status(200).send({ status: "Success", message: "Login success", token });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const [user] = await userServices.getUserByEmail(email);
    if (user.role !== "superadmin") {
      return res.status(401).send({
        status: "Error",
        message: "Not authorized, not Superadmin",
      });
    }

    if (!user) {
      res.status(401).send({ status: "Error", message: "Account not found!" });
      return;
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .send({ status: "Error", message: "Wrong password!" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.email, role: user.role },
      secretKey,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .send({ status: "Success", role: user.role, message: "Login success", token });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  // next: NextFunction
) => {
  try {
    const users = await userServices.getUsers();

    res.status(200).send({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};
