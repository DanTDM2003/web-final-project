const express = require('express');
const router = express.Router();

const SessionController = require('../controllers/SessionController.js');
const AccountController = require('../controllers/AccountController.js');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        login: req.session.login,
        url: req.url
    });
});

router.get('/products', (req, res) => {
    res.render('product/index', {
        title: 'Products',
        login: req.session.login,
        url: req.url
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Home',
        login: req.session.login,
        url: req.url
    });
});

router.route('/login')
        .get(SessionController.create)
        .post(SessionController.store);

router.get('/logout', SessionController.destroy);


router.route('/register')
        .get(AccountController.create)
        .post(AccountController.store);

module.exports = router;