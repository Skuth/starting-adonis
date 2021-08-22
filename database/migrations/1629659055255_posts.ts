import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Posts extends BaseSchema {
  protected tableName = "posts"

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()

      table.string("title").notNullable()
      table.text("content", "longtext").notNullable()
      table.string("slug").notNullable().unique()
      table
        .integer("author_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true })
      table.timestamp("updated_at", { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
