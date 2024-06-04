import type { Knex } from "knex";

import dbConfig from "./src/config";

const config: { [key: string]: Knex.Config } = {
  development: dbConfig,
};

module.exports = config;
