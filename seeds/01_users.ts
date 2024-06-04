import { Knex } from "knex";
import users from "../seeds-data/users";
import bcrypt from "bcrypt";

const saltRounds = 5;

async function getNewUsers() {
  const newUsers = users;

  await Promise.all(
    newUsers.map(
      async (e) => (e.password = await bcrypt.hash(e.password, saltRounds))
    )
  );

  return newUsers;
}

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert(await getNewUsers());
}
