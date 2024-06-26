import express, { Express, Request, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import router from "./src/routes";
import dbConfig from "./src/config";
import swaggerUi from "swagger-ui-express";

const YAML = require("yamljs");

const app: Express = express();
const port = process.env.PORT || 3000;

const knexInstance = knex(dbConfig);

Model.knex(knexInstance);

app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const swaggerDocument = YAML.load("./src/config/swagger-config.yml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
