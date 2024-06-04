import { Request, Response, NextFunction } from "express";
import userServices from "../service/userService";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const secretKey = "SECRET";
const saltRounds = 5;

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
    const { name, password, email, role } = req.body;
    const hash = await hashPassword(password);

    await userServices.createUser({
      name,
      password: hash,
      email,
      role: "user",
    });

    const user = await userServices.getUserByEmail(email);
    res.status(200).send({ status: "Success", message: "Registration sucess", data: user });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const [user] = await userServices.getUserByEmail(email);

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      res.status(200).send({ status: "Error", message: "Wrong password!" });
      return;
    }
    const token = jwt.sign(
      { id: user.id, username: user.email, role: user.role },
      secretKey,
      { expiresIn: "10m" }
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

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(200)
        .send({ status: "Error", message: "Wrong password!" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.email, role: user.role },
      secretKey,
      { expiresIn: "10m" }
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
  next: NextFunction
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
