const express = require('express');
const router = express.Router();

const Cookie = require('../utilities/Cookies.js');
const JWTAction = require('../utilities/JWTAction.js');

// Controller
const productRouter = require('../Http/controllers/ProductController.js')

router.get('/', (req, res) => { 
    const user = Cookie.decodeCookie(req.signedCookies.user);
    res.render('index', {
        title: 'Home',
        login: req.user,
        url: req.path
    });
});

// router.get('/products/:page', productRouter.getItemPerPage);

router.get('/product-detail/:id', productRouter.getSingle);

router.get('/products', productRouter.index);

router.get('/contact', (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);

    res.render('product/index', {
        title: 'Home',
        login: req.user,
        url: req.path
    });
});

router.get('/product-detail', (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);

    res.render('product/show', {
        title: 'Product detail',
        login: req.user,
        url: req.path
    });
});

module.exports = router;