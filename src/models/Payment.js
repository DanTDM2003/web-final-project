const db = require('../db.js');
const cn = require('../config/database.js');

const tbName = "Payment";
module.exports = class Payment {
    constructor(payment){
        this.User_id = payment.User_id;
        this.Firstname = payment.Firstname;
        this.Lastname = payment.Lastname;
        this.Email = payment.Email;
        this.Phone = payment.Phone;
        this.Address = payment.Address;
        this.Content = payment.Content;
        this.Date = payment.Date;
    }

    static async fetchAll() {
        let con = null;
        try {
            con = await cn.connection.connect();
            const bills = await con.any(`SELECT "${tbName}".id AS payment_id, * FROM ("${tbName}" JOIN "Users" ON "${tbName}"."User_id" = "Users".id)`);
            return bills;
        } catch (error) {
            throw error;
        } finally {
            if (con)
                con.done();
        }
    }

    static async fetch(id) {
            let con = null;
            try {
                con = await cn.connection.connect();
                const bill = await con.oneOrNone(`SELECT * FROM "${tbName}" WHERE "${tbName}".id = $1`, [id]);
                return bill;
            } catch (error) {
                throw error;
            } finally {
                if (con)
                    con.done();
            }
        }

    static async add(payment) {
        try {
            const rt = await db.add(tbName, payment);
            return rt;
        } catch (error) {
            throw error;
        }
    }

    static async count(month) {
        let con = null;
        try{
            con = await cn.connection.connect();
            const count = await con.oneOrNone(`SELECT COUNT(*) FROM "${tbName}" WHERE EXTRACT(MONTH FROM "Date") = $1`, [month]);
            return count.count;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }

    static async delete(id) {
        let con = null;
        try {
          con = await cn.connection.connect();
          console.log(id);
          await con.query(`DELETE FROM "${tbName}" WHERE id = $1`, id);
        } catch (error) {
          throw error;
        } finally {
          if (con) {
            con.done();
          }
        }
      }
}