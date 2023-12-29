const db = require('../config/database');
const tbName = "Product"
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
      const products = await con.any(`SELECT "Products".id AS product_id, "Products"."Name" AS product_name, *  FROM ("Products" JOIN "Categories" ON "Products"."Category_id" = "Categories".id) WHERE ("Products"."Name" ILIKE '%' || $1 || '%') AND ("Categories"."Name" ILIKE '%' || $2 || '%')`, conditions);
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

  static async fetch(id) {
    let con = null;
    try {
      con = await db.connection.connect();
      const product = await con.query('SELECT * FROM "Products" WHERE id = $1', [id]);
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
      const products = await con.query('SELECT * FROM "Products" LIMIT $1 OFFSET ($2 - 1) * $3', [itemPerPage, page, itemPerPage]);
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

  static async fetchRelatedProducts(id) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any('SELECT p.* FROM "Products" AS p1, "Products" AS p2 WHERE p2.id = $1 AND p1.id != p2.id AND p1."Category_id" = p2."Category_id" LIMIT 5 ', [id]);

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
  static async getAllProducts() {
    let con = null;
    try {
      con = await db.connection.connect();
      const listProducts = await con.any(`SELECT * FROM "${tbName}" ORDER BY "id" ASC`);
      return listProducts;
    } catch (error) {
      throw error;
    }
  }
  static async deleteProduct(proId) {
    let con = null;
    try {
      con = await db.connection.connect();
      await con.none(`DELETE FROM "${tbName}" WHERE id = $1`, proId);
      return;
    }
    catch (error) {
      throw error;
    }
  }
  static async updateListProducts(products) {
    let con = null;
    try {
      con = await db.connection.connect();
      products.forEach(async (pro) => {
        const query = `
        UPDATE "Product"
        SET
            "name" = $1,
            "price" = $2,
            "short_description" = $3,
            "quantity" = $4,
            "full_description" = $5,
            "catID" = $6
        WHERE
            "id" = $7`;
        console.log(pro.id);
        await con.none(query, [
          pro.name,
          pro.price,
          pro.short_description,
          pro.quantity,
          pro.full_description,
          pro.category,
          pro.id
        ]);
      });
    }
    catch (error) {
      throw error;
    }
  }
}