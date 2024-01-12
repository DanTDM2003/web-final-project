require('dotenv').config();
const jwt = require('jsonwebtoken');

const issuer = process.env.ISSUER;
const audience = process.env.AUDIENCE;
const key = process.env.JWT_SECRET_KEY;

module.exports = {
    createJWT: (data) => {
        let token = null;
        try {
            token = jwt.sign(data, key);
        } catch (error) {
            console.log(error);
        }

        return token;
    },

    decodeJWT: (token) => {
        let data = null;
        try {
            data = jwt.verify(token, key);
        } catch (error) {
            console.log(error);
        }

        return data;
    },

    serverToken: function() {
        const token = this.createJWT({ iss: issuer, aud: audience });
        return token;
    }
}