const JWTAction = require('./JWTAction.js');
const Cookies = require('./Cookies.js');

const errors = {
    404: "Sorry. Page not found."
}

module.exports = {
    abort: (req, res, code=404) => {
        const user = Cookies.decodeCookie(req.signedCookies.user);

        res.status(code).render('error', {
            title: code,
            message: errors[code],
            login: user ? JWTAction.decodeJWT(user) : null,
            url: req.path
        });
    }
}