const db = require('../db.js');
const cn = require('../config/database.js');

const tbName = 'Users';

module.exports = class User {
    constructor(user) {
        this.Fullname = user.Fullname;
        this.Username = user.Username;
        this.Password = user.Password;
        this.Email = user.Email;
        this.Role = user.Role;
    }

    static async findAll(attributes = '*') {
        let con = null;
        try {
            con = await cn.connection.connect();
            const user = await con.any(`SELECT $1:name FROM "${tbName}" ORDER BY "id" ASC`, [attributes]);
            return user;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }

    static async findOne(user) {
        let con = null;
        try {
            con = await cn.connection.connect();
            const users = await con.oneOrNone(`SELECT * FROM "${tbName}" WHERE "Email" = $1`, [user.Email]);
            return users;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }

    static async findById(id) {
        let con = null;
        try {
            con = await cn.connection.connect();
            const users = await con.oneOrNone(`SELECT * FROM "${tbName}" WHERE id = $1`, [id]);
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
            await con.none(`DELETE FROM "${tbName}" WHERE id = $1`, id);
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }
}
