const passport = require('passport');

const Cookies = require('../../utilities/Cookies.js');
const JWTAction = require('../../utilities/JWTAction.js');

module.exports = {
    create: async (req, res) => {
        res.render('session/create.ejs', {
            title: 'Login',
            errors: null,
            login: req.isAuthenticated(),
            url: req.path,
            user: req.user
        });
    },

    store: (req, res, next) => {
        passport.authenticate('LoginStrategy', (err, user, info) => {
                if (info) {
                        return res.render("session/create", {
                                title: 'Login',
                                errors: info,
                                login: req.isAuthenticated(),
                                url: req.path,
                                user: req.user
                            });
                }
                req.login(user, (err) => {
                        if (err) {
                                console.error(err);
                                return res.redirect('/login');
                        }
                        delete user.Password;
                        const token = JWTAction.createJWT(user);
                        Cookies.createCookie(res, 'user', token, true, req.body.remember);
                        return res.redirect('/');
                });
        })(req, res, next);
    },

    destroy: (req, res) => {
        Cookies.deleteCookie(res, 'user');
        req.logout((err) => {
            if (err) {
                console.error(err);
                return res.redirect('/'); // Handle any error and redirect if necessary
            }
            return res.redirect('/'); // Redirect the user after successfully logging out
        });
    }
}