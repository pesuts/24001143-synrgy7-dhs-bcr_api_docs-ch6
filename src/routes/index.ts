import express from "express";
import userRouter from "./userRoutes";
import carRouter from "./carRoutes";
import carLogRouter from "./carLogRoutes";

const router = express.Router();
const apiRouter = express.Router();

router.use("/api", apiRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/cars", carRouter);
apiRouter.use("/log", carLogRouter);

export default router;
