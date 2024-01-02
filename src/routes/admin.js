const express = require('express');
const router = express.Router();

const Products = require('./../models/Products.js');
const Users = require('./../models/Users.js')

const AdminMiddleware = require('../middlewares/Admin.js');

router.get('/dashboard', AdminMiddleware, async (req, res) => {
    const users = await Users.findAll();
    const products = await Products.fetchAll();

    res.render('admin/index', {
        title: 'Dashboard',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path,
        users: users,
        products: products
    });
});

// router.get('/manage-users', async (req, res) => {
//     const listUsers = await Users.getAllUsers();
//     res.render('admin/manage-users.ejs', {
//         title: 'Manage users',
//         login: req.isAuthenticated(),
//         user: req.user,
//         url: req.path,
//         listUsers: listUsers
//     });
// });


module.exports = router;