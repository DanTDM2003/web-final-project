const he = require('he');
const bcrypt = require('bcrypt');

const Users = require('../models/Users.js');
const Validator = require('../utilities/Validator.js');

module.exports = {
    create: (req, res) => {
        if (req.session.login === true) {
            return res.redirect('/');
        }
        
        res.render('session/create.ejs', {
            title: 'Login',
            error: '',
            login: null,
            url: req.url
        });
    },

    store: async (req, res) => {
        if (req.session.login === true) {
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
                url: req.url
            });
        }

        if (!Validator.stringValidate(encodedPassword)) {
            return res.render('session/create.ejs', {
                title: 'Login',
                error: "Your email is not valid.",
                login: null,
                url: req.url
            });
        }
        
        const user = await Users.findOne(req.body);

        if (!user) {
            return res.render('session/create.ejs', {
                title: 'Login',
                error: "Your credential is not valid.",
                login: null,
                url: req.url
            });
        } else {
            if (!bcrypt.compareSync(req.body.Password, user.Password)) {
                return res.render('session/create.ejs', {
                    title: 'Login',
                    error: "Your credential is not valid.",
                    login: null,
                    url: req.url
                });
            }
        }

        req.session.login = user.Username;
        req.session.save();
        
        return res.redirect('/');
    },

    destroy: (req, res) => {
        if (!req.session.login) {
            return res.redirect('/');
        }

        req.session.login = null;
        req.session.save();
        
        return res.redirect('/');
    }
}