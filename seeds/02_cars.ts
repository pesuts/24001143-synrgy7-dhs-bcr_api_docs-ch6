import { Knex } from "knex";
import cars from "../seeds-data/cars";

export async function seed(knex: Knex): Promise<void> {
  await knex("cars").del();

  await knex("cars").insert(cars);

  await knex.raw('select setval(\'cars_id_seq\', max(id)) from cars');
}
