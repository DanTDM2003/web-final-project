const express = require('express');
const router = express.Router();
const multer = require('multer');
const appRoot = require('app-root-path');
const path = require('path');
const passport = require('passport');

const SessionController = require('../Http/controllers/SessionController.js');
const AccountController = require('../Http/controllers/AccountController.js');
const ProductController = require('../Http/controllers/ProductController.js');
const CartController = require('../Http/controllers/CartController.js');
const CategoriesController = require('../Http/controllers/CategoryController.js');
const AuthMiddleware = require('../middlewares/Auth.js');
const GuestMiddleware = require('../middlewares/Guest.js');
const AdminMiddleware = require('../middlewares/Admin.js');

const Products = require('../models/Products.js');

const helpers = require('../utilities/helpers.js');

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, appRoot + "/src/public/img/products");
        },

        filename: async function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
});

let upload = multer({ storage: storage, fileFilter: helpers.imageFilter });

router.route('/login')
        .get(GuestMiddleware, SessionController.create)
        .post(GuestMiddleware, SessionController.store);

router.get('/logout', AuthMiddleware, SessionController.destroy);

router.route('/register')
        .get(GuestMiddleware, AccountController.create)
        .post(GuestMiddleware, AccountController.store);

router.get('/product/:id', ProductController.show);

router.get('/product/delete/:id', AdminMiddleware, ProductController.destroy);
router.post('/product/update', AdminMiddleware, ProductController.update);
router.post('/category/update', AdminMiddleware, CategoriesController.update);
router.post('/category/create', AdminMiddleware, CategoriesController.update);
router.post('/product/create', AdminMiddleware, upload.single('Thumbnail'), ProductController.store);

router.post('/users/update', AdminMiddleware, AccountController.update);
router.get('/user/delete/:id', AdminMiddleware, AccountController.destroy);

router.get('/products/pagination', async (req, res) => {
        let conditions = ['', ''];
        if (req.query.search) {
                conditions[0] = req.query.search;
        }
        if (req.query.category) {
                conditions[1] = req.query.category;
        }
        let page = 1;
        let pages;
        let products;
        if (req.query.sort == "price-up") {
                products = await Products.fetchAllPriceUp(conditions);
        } else if (req.query.sort == "price-down") {
                products = await Products.fetchAllPriceDown(conditions);
        } else if (req.query.sort == "popular") {
                products = await Products.fetchAllPriceUp(conditions);
        } else if (req.query.sort == "newest") {
                products = await Products.fetchAllNewest(conditions);
        } else {
                products = await Products.fetchAll(conditions);
        }
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

router.post('/cart/add', AuthMiddleware, CartController.store);
router.post('/cart/update', AuthMiddleware, CartController.update);
router.post('/cart/delete/:id', AuthMiddleware, CartController.delete);

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/auth/google/callback', (req, res, next) => passport.authenticate('google', (err, user, info) => {
        if (err) {
                return res.render("session/create", {
                        title: 'Login',
                        errors: err,
                        login: req.isAuthenticated(),
                        url: req.path,
                        user: req.user
                });
        }
        req.login(user, (err) => {
                if (err) {
                        return res.redirect('/login');
                }
                delete user.Password;
                delete user.Login_by;
                const token = JWTAction.createJWT(user);
                Cookies.createCookie(res, 'user', token, true, req.body.remember);
                return res.redirect('/');
        });
})(req, res, next));

module.exports = router;