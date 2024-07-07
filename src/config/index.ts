import dotenv from 'dotenv';
// import { resolve } from 'path';
dotenv.config();

const knexConfig = {
  client: process.env.DB_CLIENT!,
  connection: {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    port: parseInt(process.env.DB_PORT!, 10)!,
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    ssl: { rejectUnauthorized: false },
  },
};

export default knexConfig;
