const he = require('he');
const bcrypt = require('bcrypt');

const Users = require('../models/Users.js');
const Validator = require('../utilities/Validator.js');
const JWTAction = require('../utilities/JWTAction.js');
const Cookie = require('../utilities/Cookies.js');


module.exports = {
    create: async (req, res) => {
        if (req.signedCookies.user) {
            return res.redirect('/');
        }
        
        res.render('session/create.ejs', {
            title: 'Login',
            error: '',
            login: null,
            url: req.path
        });
    },

    store: async (req, res) => {
        if (req.signedCookies.user) {
            return res.redirect('/');
        }

        const { Email, Password } = req.body;

        const encodedEmail = he.encode(Email);
        const encodedPassword = he.encode(Password);

        if (!Validator.stringValidate(encodedEmail)) {
            return res.render('session/create.ejs', {
                title: 'Login',
                error: "Your email is not valid.",
                login: null,
                url: req.path
            });
        }

        if (!Validator.stringValidate(encodedPassword)) {
            return res.render('session/create.ejs', {
                title: 'Login',
                error: "Your email is not valid.",
                login: null,
                url: req.path
            });
        }
        
        const user = await Users.findOne(req.body);

        if (!user) {
            return res.render('session/create.ejs', {
                title: 'Login',
                error: "Your credential is not valid.",
                login: null,
                url: req.path
            });
        } else {
            if (!bcrypt.compareSync(req.body.Password, user.Password)) {
                return res.render('session/create.ejs', {
                    title: 'Login',
                    error: "Your credential is not valid.",
                    login: null,
                    url: req.path
                });
            }
        }
        delete user.Password;

        const token = JWTAction.createJWT(user);
        Cookie.createCookie(res, 'user', token, true, req.body.remember);
        
        return res.redirect('/');
    },

    destroy: (req, res) => {
        if (!req.signedCookies.user) {
            return res.redirect('/');
        }
        
        Cookie.deleteCookie(res, 'user');
        
        return res.redirect('/');
    }
}