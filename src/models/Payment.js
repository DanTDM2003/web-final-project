const db = require('../db.js');

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
    }
    static async add(payment) {
        try {
            const rt = await db.add(tbName, payment);
            return rt;
        } catch (error) {
            throw error;
        }
    }
}