const db = require('./config/database.js');

module.exports = {
    all: async (tbName) => {
        let con = null;
        try {
            con = await db.connection.connect();
            const rs = await con.any(`SELECT * FROM "${tbName}"`);
            return rs;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    },

    get: async (tbName, obj) => {
        let con = null;
        try {
            con = await db.connection.connect();
            const rs = await con.any(`SELECT * FROM "${tbName}" WHERE ("Email" LIKE $1) AND ("Password" LIKE $2)`);
            return rs;
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    },

    add: async (tbName, obj) => {
        let con = null;
        try {
            con = await db.connection.connect();
            let sql = db.pgp.helpers.insert(obj, null, tbName);
            await con.query(sql);
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    },
    
    update: async (tbName, obj) => {
        let con = null;
        try {
            con = await db.connection.connect();
            db.pgp.helpers.update(obj, null, tbName);
        } catch (error) {
            throw error;
        } finally {
            if (con) {
                con.done();
            }
        }
    }
};