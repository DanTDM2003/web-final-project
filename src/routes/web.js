const express = require('express');
const router = express.Router();

const Cookie = require('../utilities/Cookies.js');
const JWTAction = require('../utilities/JWTAction.js');

router.get('/', (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);

    res.render('index', {
        title: 'Home',
        login: user ? JWTAction.decodeJWT(user) : null,
        url: req.path
    });
});

router.get('/products', (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);

    res.render('product/index', {
        title: 'Products',
        login: user ? JWTAction.decodeJWT(user) : null,
        url: req.path
    });
});

router.get('/contact', (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    
    res.render('contact', {
        title: 'Home',
        login: user ? JWTAction.decodeJWT(user) : null,
        url: req.path
    });
});

module.exports = router;