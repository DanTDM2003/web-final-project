const bcrypt = require('bcrypt');

const Users = require('../models/Users.js');
const JWTAction = require('../utilities/JWTAction.js');
const Cookie = require('../utilities/Cookies.js');

module.exports = {
    login: function (res, user, remember) {
        const token = JWTAction.createJWT(user);
        Cookie.createCookie(res, 'user', token, true, remember);
    },

    logout: function (res) {
        Cookie.deleteCookie(res, 'user');
    },

    attempt: async function (email, password, remember, res) {
        const user = await Users.findOne({ Email: email, Password: password});

        if (user) {
            if (bcrypt.compareSync(password, user.Password)) {
                delete user.Password;
                this.login(res, user, remember);
                
                return true;
            }
        }

        return false;
    }
}