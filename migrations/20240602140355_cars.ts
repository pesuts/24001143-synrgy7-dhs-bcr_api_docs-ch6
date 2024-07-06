import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table: Knex.TableBuilder) => { 
    table.increments('id').primary();
    table.string('model', 255).notNullable();
    table.string('manufacture', 255).notNullable();
    table.string('plate', 255).notNullable();
    // table.string('image_url', 255).notNullable();
    table.string('image_url', 255).nullable();
    table.integer('price').notNullable();
    table.string('category', 50).notNullable();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').notNullable();
    table.boolean('available',).nullable().defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('cars');
}

