const db = require('../db.js');
const cn = require('../config/database.js');


const tbName = 'Users';

module.exports = class User {
    constructor(user) {
        this.Fullname = user.Fullname;
        this.Username = user.Username;
        this.Password = user.Password;
        this.Email = user.Email;
    }

    static async findAll() {
        try {
            const users = await db.all(tbName);
            return users;
        } catch (error) {
            throw error;
        }
    }
    
    static async findOne(user) {
        let con = null;
        try {
            con = await cn.connection.connect();
            const users = await con.oneOrNone(`SELECT * FROM "${tbName}" WHERE ("Email" = $1)`, [user.Email]);
            return users;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }

    static async add(user) {
        try {
            const rt = await db.add(tbName, user);
            return rt;
        } catch (error) {
            throw error;
        }
    }
}
