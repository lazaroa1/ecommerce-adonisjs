'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', table => {
      table.increments()
      table.strin('name', 200)
      table.string(image_id).unsigned()
      table.text('description')
      table.decimal('price', 12,2)
      table.timestamps()

      table
      .foreign('image_id')
      .reference('id')
      .inTable('image')
      .onDelete('cascade')
    })

    this.create('image_product', table => {
      table.increments()
      table.integer('image_id').unsigned()
      table.integer('product_id').unsigned()
      table
      .foreign('image_id')
      .reference('id')
      .inTable('image')
      .onDelete('cascade')
      table
      .foreign('product_id')
      .reference('id')
      .inTable('products')
      .onDelete('cascade')
    })

    this.create('category_products', table => {
      table.integer('product_id').unsigned()
      table.integer('category_id').unsigned()
      table
      .foreign('product_id')
      .reference('id')
      .inTable('products')
      .onDelete('cascade')
      table
      .foreign('category_id')
      .reference('id')
      .inTable('categories')
      .onDelete('cascade')
    }) 
  }

  down () {
    this.drop('category_products')
    this.drop('image_product')
    this.drop('products')
  }
}

module.exports = ProductSchema
