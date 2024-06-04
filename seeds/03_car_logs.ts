import { Knex } from "knex";
import carLogs from "../seeds-data/carLogs";

export async function seed(knex: Knex): Promise<void> {
  await knex("car_logs").del();

  await knex("car_logs").insert(carLogs);
}
