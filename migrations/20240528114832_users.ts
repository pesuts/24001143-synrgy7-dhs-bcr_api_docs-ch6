import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => { 
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.string('email', 50).unique().notNullable();
    table.string('password', 100).notNullable();
    table.string('role').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

