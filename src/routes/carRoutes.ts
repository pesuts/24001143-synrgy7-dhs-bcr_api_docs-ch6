import express from "express";
import {
  addCar,
  deleteCarById,
  getAllCars,
  getCarById,
  updateCarById,
  getAvailableCars,
} from "../controller/carController";
import idChecker from "../middleware/idChecker";
import upload from "../middleware/uploadHandler";
import { authAdmin, authToken } from "../middleware/authToken";

const carRouter = express.Router();

carRouter.get("/available", authToken, authAdmin, getAvailableCars);
carRouter.get("/", authToken, authAdmin, getAllCars);
carRouter.get("/:id", idChecker, authToken, authAdmin, getCarById);
carRouter.post("/", upload.single("image"), authToken, authAdmin, addCar);
carRouter.put(
  "/:id",
  upload.single("image"),
  idChecker,
  authToken,
  authAdmin,
  updateCarById
);
carRouter.delete("/:id", idChecker, authToken, authAdmin, deleteCarById);

export default carRouter;
