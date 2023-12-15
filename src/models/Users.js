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

    static async findAll(attributes = '*') {
        let con = null;
        try {
            con = await cn.connection.connect();
            const user = await con.any(`SELECT $1:name FROM "${tbName}"`, [attributes]);
            return user;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }

    static async findOne(user, attributes = '*') {
        let con = null;
        try {
            con = await cn.connection.connect();
            const users = await con.oneOrNone(`SELECT $1:name FROM "${tbName}" WHERE "Email" = $2`, [attributes, user.Email]);
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
    static async getAllUsers() {
        let con = null;
        try {
            con = await cn.connection.connect();
            const listUsers = await con.any(`SELECT * FROM "${tbName}" ORDER BY "id" ASC`);
            return listUsers;
        } catch (error) {
            throw error;
        }
    }
    static async updateListUsers(users) {
        let con = null;
        try {
            con = await cn.connection.connect();
            users.forEach(async (user) => {
                const query = `
                UPDATE "Users"
                SET
                    "Fullname" = $1,
                    "Username" = $2,
                    "Email" = $3
                WHERE
                    "id" = $4`;
                await con.none(query, [
                    user.Fullname,
                    user.Username,
                    user.Email,
                    user.id
                ]);
            });
        }
        catch (error) {
            throw error;
        }
    }
    static async deleteUser(userId) {
        let con = null;
        try {
            con = await cn.connection.connect();
            console.log("ID: ", userId);
            await con.none(`DELETE FROM "${tbName}" WHERE id = $1`, userId);
        }
        catch (error) {
            throw error;
        }
    }
}
