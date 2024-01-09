const express = require('express');
const router = express.Router();

const ProductController = require('../Http/controllers/ProductController.js');
const CartController = require('../Http/controllers/CartController.js');
const PaymentController = require('../Http/controllers/PaymentController.js')

const AuthMiddleware = require('../middlewares/Auth.js');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path
    });
});

router.get('/products', ProductController.index);

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path
    });
});

router.get('/cart', AuthMiddleware, CartController.index);

router.get('/checkout', PaymentController.index)

module.exports = router;