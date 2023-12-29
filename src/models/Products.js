const db = require('../config/database');

module.exports = class Product {
  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.star = product.star;
    this.price = product.price;
    this.short_description = product.short_description;
    this.quantity = product.quantity;
    this.full_description = product.full_description;
  }

  static async fetchAll(conditions = ['', '']) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any(`SELECT * FROM ("Product" JOIN "Category" ON "Product"."catID" = "Category"."catID") WHERE ("Product".name ILIKE '%' || $1 || '%') AND ("Category"."catName" ILIKE '%' || $2 || '%')`, conditions);
      return products;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (con)
        con.done();
    }
  }
  static async getMaxID() {
    let con = null;
    try {
      con = await db.connection.connect();
      const maxID = await con.one('SELECT MAX(id) FROM "Product"');
      return maxID;
    } catch (error) {
      throw error;
    }
  }

  static async getProduct(id) {
    let con = null;
    try {
      con = await db.connection.connect();
      const product = await con.query('SELECT * FROM "Product" WHERE id = $1', [id]);
      return product;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (con)
        con.done();
    }
  }

  static async getProducts(page, itemPerPage) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.query('SELECT * FROM "Product" LIMIT $1 OFFSET ($2 - 1) * $3', [itemPerPage, page, itemPerPage]);
      return products;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (con)
        con.done();
    }
  }

  static async getAllCategories() {
    let con = null;
    try {
      con = await db.connection.connect();
      const categories = await con.any('SELECT * FROM "Category"');
      return categories;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (con)
        con.done();
    }
  }

  static async getSameCategory(catName) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any('SELECT p.* FROM "Product" p, "Category" c WHERE p."catID" = c."catID" AND c."catName" = $1', [catName]);
      return products;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (con)
        con.done();
    }
  }

  static async getRelatedProducts(id) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any('SELECT p.* FROM "Product" p, "Product" pid WHERE pid.id = $1 AND p.id != pid.id AND p."catID" = pid."catID" LIMIT 5 ', [id]);
      return products;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (con)
        con.done();
    }
  }
  static async add(tbName, obj) {
    let con = null;
    try {
      con = await db.connection.connect();
      let sql = db.pgp.helpers.insert(obj, null, tbName)
      await con.none(sql);
      return;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (con)
        con.done();
    }
  }
}