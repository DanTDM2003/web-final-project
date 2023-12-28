const express = require('express');
const router = express.Router();

const SessionController = require('../Http/controllers/SessionController.js');
const AccountController = require('../Http/controllers/AccountController.js');
const ProductController = require('../Http/controllers/ProductController.js');

const AuthMiddleware = require('../middlewares/Auth.js');
const GuestMiddleware = require('../middlewares/Guest.js');

const Products = require('../models/Products.js');

router.route('/login')
        .get(GuestMiddleware, SessionController.create)
        .post(GuestMiddleware, SessionController.store);

router.get('/logout', AuthMiddleware, SessionController.destroy);

router.route('/register')
        .get(GuestMiddleware, AccountController.create)
        .post(GuestMiddleware, AccountController.store);

router.get('/product/:id', ProductController.show);

router.get('/data', async (req, res) => {
        let conditions = ['', ''];
        if (req.query.search) {
                conditions[0] = req.query.search;
        }
        if (req.query.category) {
                conditions[1] = req.query.category;
        }
        let page = 1;
        let pages;
        let products = await Products.fetchAll(conditions);
        pages = Math.ceil(products.length / 9);
        if (req.query.page) {
                if (req.query.page < 1) {
                        page = 1;
                } else if (req.query.page > pages) {
                        page = pages;
                } else {
                        page = req.query.page;
                }
        }
        products = products.slice((page - 1) * 9, page * 9);

        res.json({ products: products, page: page, pages: pages });
});

module.exports = router;