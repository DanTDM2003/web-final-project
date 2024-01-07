const db = require('../db.js');
const cn = require('../config/database.js');

const tbName = 'Wallet';

module.exports = class Wallet {
  constructor(wallet){
    this.id = wallet.id;
    this.Balance = wallet.Balance;
  }

  static async add(balance) {
    try {
        const rt = await db.add(tbName, balance);
        return rt;
    } catch (error) {
        throw error;
    }
}

  static async getCurrentBalance(id){
    let con = null;
    try {
        con = await cn.connection.connect();
        const balance = await con.oneOrNone(`SELECT "Balance" FROM "${tbName}" WHERE id = $1`, [id]);
        return balance;
    } catch (error) {
        throw error;
    } finally {
        if (con) {
            con.done();
        }
    }
  }

  static async update(id, total, balance) {
    let con = null, price = balance - total;
    try {
        if (price >= 0) {
            con = await cn.connection.connect();
            await con.oneOrNone(`UPDATE "${tbName}" SET "Balance" = $1 WHERE id = $2`, [price, id]);
            return true;
        }
        else 
            return false
    } catch (error) {
        throw error;
    } finally {
        if (con) {
            con.done();
        }
    }
  }
}