import express from "express";
import userRouter from "./userRoutes";
import carRouter from "./carRoutes";
import carLogRouter from "./carLogRoutes";
import swaggerUi from "swagger-ui-express";

const router = express.Router();
const apiRouter = express.Router();

router.use("/api/v1", apiRouter);

const YAML = require("yamljs");
const swaggerDocument = YAML.load("./src/config/swagger-config.yml");
apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

apiRouter.use("/users", userRouter);
apiRouter.use("/cars", carRouter);
apiRouter.use("/log", carLogRouter);

export default router;
