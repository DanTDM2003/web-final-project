const db = require('../config/database');

const tbName = "Categories";
module.exports = class Category {
  constructor(category){
    this.Name = category.Name;
  }

  static async fetchAll(){
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
      if(con)
        con.done();
    }
  }
}