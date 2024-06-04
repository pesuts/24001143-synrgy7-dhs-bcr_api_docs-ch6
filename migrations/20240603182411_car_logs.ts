import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("car_logs", (table: Knex.TableBuilder) => {
    table.increments("id");
    table.integer("car_id").notNullable().primary();
    table.integer("created_by").notNullable().primary();
    table.integer("updated_by").nullable().primary();
    table.integer("deleted_by").nullable().primary();

    // table.foreign('car_id').references('id').inTable('cars').onDelete("NO ACTION");
    table.foreign("created_by").references("id").inTable("users");
    table.foreign("updated_by").references("id").inTable("users");
    table.foreign("deleted_by").references("id").inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("car_logs");
}
