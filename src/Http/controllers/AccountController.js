const bcrypt = require('bcrypt');
const he = require('he');

const RegisterForm = require('../Forms/RegisterForm.js');

const Users = require('../../models/Users.js');
const Carts = require('../../models/Carts.js');
const Wallets = require('../../models/Wallet.js')

module.exports = {
    create: (req, res) => {
        res.render('registration/create', {
            errors: null,
            title: 'Registration',
            login: req.isAuthenticated(),
            url: req.path,
            user: req.user
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
                await Users.add({ Fullname, Username, Password: bcrypt.hashSync(Password, 10), Email, Role: "User", Login_by: "Normal" });
                const newUser = await Users.findOne({ Email });
                await Carts.add({ User_id: newUser.id, Cart: '[]' });
                await Wallets.add({User_id: newUser.id, Balance: 1000});

                return req.login({ Fullname, Username, Email, Role: "User" }, (err) => {
                    return res.redirect('/');
                })
            } else {
                form.setError('credential', "The email is already used.");
            }
        }

        return res.render('registration/create', {
            errors: form.getErrors(),
            title: 'Registration',
            login: req.isAuthenticated(),
            url: req.path,
            user: req.user
        });
    },

    update: async (req, res) => {
        const changedListUsers = JSON.parse(req.body.changedUsers);
        await Users.updateListUsers(changedListUsers);
    
        res.redirect("back");
    },

    destroy: async (req, res) => {
        const id = req.params.id;
        if (!(await Users.findById(id))) {
                helpers.abort(req, res, 404);
        } else {
                await Users.delete(id);
        }

        res.redirect("back");
    }
}