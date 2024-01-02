const db = require('../db.js');
const cn = require('../config/database.js');

const tbName = "Carts";
module.exports = class Cart {
    constructor(cart){
        this.User_id = cart.User_id;
        this.Cart = cart.Cart;
    }

    static async fetchAll(){
        let con = null;
        try {
            con = await cn.connection.connect();
            const carts = await con.any(`SELECT * FROM "${tbName}"`);
            return carts;
        } catch (error) {
            throw error;
        } finally {
            if(con)
                con.done();
        }
    }
    
    static async fetchWithUserId(id){
        let con = null;
        try {
            con = await cn.connection.connect();
            const carts = await con.oneOrNone(`SELECT * FROM "${tbName}" WHERE "User_id" = $1`, [id]);
            return carts;
        } catch (error) {
            throw error;
        } finally {
            if(con)
                con.done();
        }
    }

    static async add(cart) {
        try {
            const rt = await db.add(tbName, cart);
            return rt;
        } catch (error) {
            throw error;
        }
    }

    static async update(newInfo) {
        try {
            await db.update(tbName, newInfo);
        } catch (error) {
            throw error;
        }
    }
}