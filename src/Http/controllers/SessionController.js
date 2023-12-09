const he = require('he');

const LoginForm = require('../Forms/LoginForm.js');
const Authenticator = require('../../utilities/Authenticator.js');

module.exports = {
    create: async (req, res) => {
        res.render('session/create.ejs', {
            title: 'Login',
            errors: null,
            login: null,
            url: req.path
        });
    },

    store: async (req, res) => {
        const form = new LoginForm();

        let { Email, Password } = req.body;

        Email = he.encode(Email);
        Password = he.encode(Password);

        if (form.validate(Email, Password)) {
            if (await Authenticator.attempt(Email, Password, req.body.remember, res)) {
                return res.redirect('/');
            }
            
            return res.render("session/create", {
                title: 'Login',
                errors: { input: "Your credential is invalid." },
                login: null,
                url: req.path
            });
        }
        
        return res.render("session/create", {
            title: 'Login',
            errors: form.getErrors(),
            login: null,
            url: req.path
        });
    },

    destroy: (req, res) => {
        Authenticator.logout(res);
        
        return res.redirect('/');
    }
}