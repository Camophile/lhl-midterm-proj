
exports.up = function(knex, Promise) {

  return Promise.all([

    //food_types
    knex.schema.createTable('food_types', function(table){
      table.increments('id').primary();
      table.string('name');
    }),

    //items
    knex.schema.createTable('items', function(table){
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.decimal('price',7, 2); // check the data type - round
      table.integer('food_type_id').unsigned();
      table.foreign('food_type_id').references('food_types.id');
    }),

    //statuses
    knex.schema.createTable('statuses', function(table){
      table.increments('id').primary();
      table.string('status_name');
    }),

    //orders
    knex.schema.createTable('orders', function(table){
      table.increments('id').primary();
      table.string('cus_name');
      table.string('phone');
      table.integer('status_id').unsigned();
      table.foreign('status_id').references('statuses.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    //line_items

    knex.schema.createTable('line_items', function(table){
      table.increments('id').primary();
      table.integer('quantity');
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.id');
      table.integer('item_id').unsigned();
      table.foreign('item_id').references('items.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([

    knex.schema.table('line_items', function (table) {
      table.dropColumns('item_id', 'order_id');
    }),
    knex.schema.table('orders', function (table) {
      table.dropColumn('status_id');
    }),
    knex.schema.table('items', function (table) {
      table.dropColumn('food_type_id');
    }),
    knex.schema.dropTable('statuses'),
    knex.schema.dropTable('line_items'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('items'),
    knex.schema.dropTable('food_types')
  ])

};
