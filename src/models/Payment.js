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
        }
    }
}