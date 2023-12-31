const express = require('express');
const router = express.Router();

const Products = require('./../models/Products.js');
const Users = require('./../models/Users.js')
const Categories = require('./../models/Categories.js')

const AdminMiddleware = require('../middlewares/Admin.js');

router.get('/dashboard', AdminMiddleware, async (req, res) => {
    const users = await Users.findAll();
    const products = await Products.fetchAll();
    const categories = await Categories.fetchAll();
    console.log(categories);
    res.render('admin/index', {
        title: 'Dashboard',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path,
        users: users,
        products: products,
        categories: categories
    });
});
router.get('/update-thumbnail-form/:proId', AdminMiddleware, async (req, res) => {
    const id = req.params.proId;
    const product = await Products.fetch(id)
    res.render('admin/update-thumbnail-form.ejs', {
        title: 'Dashboard',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path
    });
});




module.exports = router;