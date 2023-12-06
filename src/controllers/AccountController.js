const bcrypt = require('bcrypt');

const Users = require('../models/Users.js');

module.exports = {
    create: (req, res) => {
        if (req.session.login === true) {
            return res.redirect('/');
        }

        res.render('registration/create', {
            error: '',
            title: 'Registration',
            login: null,
            url: req.url
        });
    },

    store: async (req, res) => {
        if (req.session.login === true) {
            return res.redirect('/');
        }

        req.body.Password = bcrypt.hashSync(req.body.Password, 10);

        let newAccount = req.body;
        Users.add(newAccount);

        req.session.login = req.body.Username;
        req.session.save();

        res.redirect('/');
    }
}