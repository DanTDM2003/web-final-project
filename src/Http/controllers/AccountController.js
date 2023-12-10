const bcrypt = require('bcrypt');
const he = require('he');

const Users = require('../../models/Users.js');

const RegisterForm = require('../Forms/RegisterForm.js');
const Authenticator = require('../../utilities/Authenticator.js');

module.exports = {
    create: (req, res) => {
        res.render('registration/create', {
            errors: null,
            title: 'Registration',
            login: null,
            url: req.path
        });
    },

    store: async (req, res) => {
        const form = new RegisterForm();

        let { Fullname, Username, Password, Email } = req.body;

        Fullname = he.encode(Fullname);
        Username = he.encode(Username);
        Password = he.encode(Password);
        Email = he.encode(Email);

        if (form.validate(Fullname, Username, Password, Email)) {
            const user = await Users.findOne({ Email: Email, Password: Password });
            if (!user) {
                Password = bcrypt.hashSync(Password, 10);

                let newAccount = req.body;
                Users.add(newAccount);

                delete newAccount.Password;

                await Authenticator.attempt(Email, Password, req.body.remember, res);
                return res.redirect('/');
            }

            form.setError('credential', "The email is already used.");
        }

        return res.render('registration/create', {
            errors: form.getErrors(),
            title: 'Registration',
            login: null,
            url: req.path
        });
    }
}