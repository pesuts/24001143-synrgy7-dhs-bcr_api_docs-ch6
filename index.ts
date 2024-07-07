import express, { Express, Request, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import router from "./src/routes";
import dbConfig from "./src/config";
// import swaggerUi from "swagger-ui-express";
import cors from "cors";
import path from "path";

const YAML = require("yamljs");

const app: Express = express();
const port = process.env.PORT || 8080;

const knexInstance = knex(dbConfig);

Model.knex(knexInstance);

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// app.use(express.static('public'))
// app.set('uploads', path.join(__dirname, 'public/uploads'));

app.use(cors());
app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

// const swaggerDocument = YAML.load("./src/config/swagger-config.yml");

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", (req: Request, res: Response) => {
  res.redirect('/api/v1/api-docs');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
