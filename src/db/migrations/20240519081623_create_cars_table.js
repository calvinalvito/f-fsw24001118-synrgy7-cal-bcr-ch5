exports.up = async function(knex) {
  await knex.schema.createTable('cars', function(table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.integer('price').notNullable();
    table.text('picture').notNullable();
    table.timestamp('start_rent').notNullable();
    table.timestamp('finish_rent').notNullable();
    table.timestamp('created_at').nullable();
    table.timestamp('updated_at').nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('cars');
};
