const db = require('../config/database');

module.exports = class Category {
  constructor(category){
    this.catID = category.catID;
    this.catName = category.catName;
  }

  static async getAllCategories(){
    let con = null;
    try {
      con = await db.connection.connect();
      const categories = await con.any('SELECT * FROM "Category"');
      console.log(categories)
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