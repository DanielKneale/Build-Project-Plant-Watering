exports.up = function (knex) {
    return knex.schema
      .createTable('users', users => {
        users.increments("id");
        users.string('username', 255).notNullable().unique();
        users.string('phone',10).notNullable().unique();
        users.string('password', 255).notNullable();
    })
    .createTable("plants",tbl=>{
        tbl.increments("id")
        tbl.string("nickname",128).notNullable()
        tbl.string("species ",128).notNullable()
        tbl.string("h2oFrequency",128).notNullable()
        tbl.integer("owner")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            
    })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
  };
  