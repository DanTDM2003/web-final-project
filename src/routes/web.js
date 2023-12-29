const express = require('express');
const router = express.Router();

const ProductController = require('../Http/controllers/ProductController.js')

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        login: req.user,
        url: req.path,
        user: req.user
    });
});

router.get('/products', ProductController.index);

router.get('/contact', (req, res) => {
    res.render('product/index', {
        title: 'Contact',
        login: req.isAuthenticated(),
        url: req.path,
        user: req.user
    });
});

module.exports = router;