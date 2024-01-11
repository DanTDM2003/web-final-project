const express = require('express');
const router = express.Router();

const ProductController = require('../Http/controllers/ProductController.js');
const CartController = require('../Http/controllers/CartController.js');
const PaymentController = require('../Http/controllers/PaymentController.js')

const AuthMiddleware = require('../middlewares/Auth.js');

const Products = require('../models/Products.js');

router.get('/', async (req, res) => {
    const newestProducts = await Products.fetchAllNewest();
    const expensiveProducts = await Products.fetchAllPriceDown();
    res.render('index', {
        title: 'Home',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path,
        newestProducts: newestProducts.slice(0, 10),
        expensiveProducts: expensiveProducts.slice(0, 10)
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

router.get('/checkout', AuthMiddleware, PaymentController.index)

module.exports = router;