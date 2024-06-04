import express from "express";

import { getCarLogByCarId } from "../controller/carLogController ";
import { authAdmin, authToken } from "../middleware/authToken";
import idLogChecker from "../middleware/idLogChecker";
const carLogRouter = express.Router();

carLogRouter.get("/:id", idLogChecker, authToken, authAdmin, getCarLogByCarId);

export default carLogRouter;
