const db = require('../db.js');
const cn = require('../config/database');

const tbName = "Categories";
module.exports = class Category {
  constructor(category) {
    this.Name = category.Name;
  }

  static async fetchAll() {
    let con = null;
    try {
      con = await cn.connection.connect();
      const categories = await con.any(`SELECT * FROM "${tbName}" ORDER BY "id" ASC`);
      return categories;
    } catch (error) {
      throw error;
    } finally {
      if (con)
        con.done();
    }
  }
  static async updateListCategories(categories) {
    let con = null;
    try {
      con = await cn.connection.connect();

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
    let con = null;
    try {
      con = await cn.connection.connect()
      let sql = cn.pgp.helpers.insert(obj, null, tbName)
      await con.query(sql);
    } catch (error) {
      throw error;
    } finally {
      if (con) {
        con.done();
      }
    }
  }

}