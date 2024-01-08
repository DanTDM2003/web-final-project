const db = require('../config/database');

const tbName = "Categories";
module.exports = class Category {
  constructor(category) {
    this.Name = category.Name;
  }

  static async fetchAll() {
    let con = null;
    try {
      con = await db.connection.connect();
      const categories = await con.any(`SELECT * FROM "${tbName}"`);
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
  static async updateListCategories(categories) {
    let con = null;
    try {
      con = await db.connection.connect();

      // Sử dụng Promise.all để đợi tất cả các truy vấn cập nhật hoàn thành
      await Promise.all(categories.map(async (cat) => {
        console.log(cat);
        const query = `
          UPDATE "${tbName}"
          SET
              "Name" = $1
          WHERE
              "id" = $2`;
        await con.query(query, [cat.Name, cat.id]);
      }));
    } catch (error) {
      throw error;
    } finally {
      if (con) {
        con.done();
      }
    }
  }
  static async add(obj) {
    console.log("cat:", obj)
    let con = null;
    try {
      con = await db.connection.connect()
      let sql = db.pgp.helpers.insert(obj, null, tbName)
      await con.none(sql);
      return;
    } catch (error) {
      throw error;
    }
  }

}