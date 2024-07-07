import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secretKey = "SECRET";

export function authToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers;

  const token = header.authorization?.split(" ")[1];
  if (token == null) {
    return res
      .status(403)
      .send({ status: "error", message: "Token not valid" });
  }

  jwt.verify(token!, secretKey, (err) => {
    if (err)
      return res
        .status(403)
        .send({ status: "error", message: "Token expired" });

    const jwtPayload = Buffer.from(token.split(".")[1], "base64").toString();
    const jsonPayload = JSON.parse(jwtPayload);
    req.body.user = jsonPayload;
    next();
  });
}

export function authAdmin(req: Request, res: Response, next: NextFunction) {
  if (["admin", "superadmin"].includes(req.body.user.role)) {
    next();
  } else
    return res
      .status(401)
      .send({ status: "Error", message: "Role must be Admin or SuperAdmin" });
}

export function authSuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.user.role === "superadmin") {
    next();
  } else
    return res
      .status(401)
      .send({ status: "Error", message: "Role must be Super Admin" });
}
