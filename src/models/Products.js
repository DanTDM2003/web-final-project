const db = require(`../config/database`);

const tbName = "Products";
module.exports = class Product {
  constructor(product) {
    this.Name = product.Name;
    this.Rating = product.Rating;
    this.Price = product.Price;
    this.Short_Description = product.Short_Description;
    this.Quantity = product.Quantity;
    this.Full_Description = product.Full_Description;
  }

  static async fetchAll(conditions = [``, ``]) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any(`SELECT "${tbName}".id AS product_id, "${tbName}"."Name" AS product_name, * FROM ("${tbName}" JOIN "Categories" ON "${tbName}"."Category_id" = "Categories".id) WHERE ("${tbName}"."Name" ILIKE '%' || $1 || '%') AND ("Categories"."Name" ILIKE '%' || $2 || '%') ORDER BY "${tbName}".id ASC`, conditions);
      return products;
    } catch (error) {
      throw error;
    } finally {
      if (con)
        con.done();
    }
  }
  
  static async fetchAllNewest(conditions = [``, ``]) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any(`SELECT "${tbName}".id AS product_id, "${tbName}"."Name" AS product_name, * FROM ("${tbName}" JOIN "Categories" ON "${tbName}"."Category_id" = "Categories".id) WHERE ("${tbName}"."Name" ILIKE '%' || $1 || '%') AND ("Categories"."Name" ILIKE '%' || $2 || '%') ORDER BY "${tbName}".id DESC`, conditions);
      return products;
    } catch (error) {
      throw error;
    } finally {
      if (con)
        con.done();
    }
  }
  
  static async fetchAllPriceUp(conditions = [``, ``]) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any(`SELECT "${tbName}".id AS product_id, "${tbName}"."Name" AS product_name, * FROM ("${tbName}" JOIN "Categories" ON "${tbName}"."Category_id" = "Categories".id) WHERE ("${tbName}"."Name" ILIKE '%' || $1 || '%') AND ("Categories"."Name" ILIKE '%' || $2 || '%') ORDER BY "${tbName}"."Price" DESC`, conditions);
      return products;
    } catch (error) {
      throw error;
    } finally {
      if (con)
        con.done();
    }
  }
  
  static async fetchAllPriceDown(conditions = [``, ``]) {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any(`SELECT "${tbName}".id AS product_id, "${tbName}"."Name" AS product_name, * FROM ("${tbName}" JOIN "Categories" ON "${tbName}"."Category_id" = "Categories".id) WHERE ("${tbName}"."Name" ILIKE '%' || $1 || '%') AND ("Categories"."Name" ILIKE '%' || $2 || '%') ORDER BY "${tbName}"."Price" ASC`, conditions);
      return products;
    } catch (error) {
      throw error;
    } finally {
      if (con)
        con.done();
    }
  }

  static async getMaxID() {
    let con = null;
    try {
      con = await db.connection.connect();
      const maxID = await con.one(`SELECT MAX(id) FROM "${tbName}"`);
      return maxID;
    } catch (error) {
      throw error;
    }
  }

  static async fetch(id) {
    let con = null;
    try {
      con = await db.connection.connect();
      const product = await con.oneOrNone(`SELECT "${tbName}".id AS product_id, "${tbName}"."Name" AS product_name, * FROM ("${tbName}" JOIN "Categories" ON "${tbName}"."Category_id" = "Categories".id) WHERE "${tbName}".id = $1`, [id]);
      return product;
    } catch (error) {
      throw error;
    } finally {
      if (con)
        con.done();
    }
  }

  static async fetchRelatedProducts() {
    let con = null;
    try {
      con = await db.connection.connect();
      const products = await con.any(`SELECT p1.* FROM "${tbName}" AS p1, "${tbName}" AS p2 WHERE p2.id = $1 AND p1.id != p2.id AND p1."Category_id" = p2."Category_id" LIMIT 5`);
      return products;
    } catch (error) {
      throw error;
    } finally {
      if (con)
        con.done();
    }
  }

  static async add(obj) {
    let con = null;
    try {
      con = await db.connection.connect();
      let sql = db.pgp.helpers.insert(obj, null, tbName)
      await con.none(sql);
      return;
    } catch (error) {
      throw error;
    } finally {
      if (con)
        con.done();
    }
  }

  static async delete(id) {
    let con = null;
    try {
      con = await db.connection.connect();
      await con.none(`DELETE FROM "${tbName}" WHERE id = $1`, id);
      return;
    } catch (error) {
      throw error;
    } finally {
      if (con) {
        con.done();
      }
    }
  }

  static async updateListProducts(products) {
    let con = null;
    try {
      con = await db.connection.connect();
      products.forEach(async (pro) => {
        const query = `
        UPDATE "${tbName}"
        SET
            "Name" = $1,
            "Price" = $2,
            "Short_Description" = $3,
            "Quantity" = $4,
            "Full_Description" = $5,
            "Category_id" = $6
        WHERE
            "id" = $7`;
        console.log(pro.id);
        await con.query(query, [
          pro.Name,
          pro.Price,
          pro.Short_Description,
          pro.Quantity,
          pro.Full_Description,
          pro.Category_id,
          pro.id
        ]);
      });
    } catch (error) {
      throw error;
    } finally {
      if (con) {
        con.done();
      }
    }
  }
}