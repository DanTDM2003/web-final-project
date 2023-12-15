const express = require('express');
const router = express.Router();

const SessionController = require('../Http/controllers/SessionController.js');
const AccountController = require('../Http/controllers/AccountController.js');
const AuthMiddleware = require('../middlewares/Auth.js');
const GuestMiddleware = require('../middlewares/Guest.js');

const UserR = require('./../models/Users.js')

const Cookie = require('../utilities/Cookies.js');
const JWTAction = require('../utilities/JWTAction.js');

router.get('/', (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    res.render('admin/index', {
        title: 'Dashboard',
        login: req.user,
        url: req.path
    });
});
router.get('/products', (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    res.render('admin/products', {
        title: 'Products',
        login: req.user,
        url: req.path
    });
});
router.get('/manage-users', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const listUsers = await UserR.getAllUsers();
    console.log("listUsers: ", listUsers);
    res.render('admin/manage-users.ejs', {
        title: 'Manage users',
        login: req.user,
        url: req.path,
        listUsers: listUsers
    });
});
router.post('/update', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const changedListUsers = JSON.parse(req.body.changedUsers);
    console.log("listUsers: ", changedListUsers);
    await UserR.updateListUsers(changedListUsers);
    const listUsers = await UserR.getAllUsers();
    res.render('admin/manage-users.ejs', {
        title: 'Manage users',
        login: req.user,
        url: req.path,
        listUsers: listUsers
    });
});
router.get('/delete/:id', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const userId = req.params.id;
    console.log("ID: ", userId);
    await UserR.deleteUser(userId);
    const listUsers = await UserR.getAllUsers();
    res.render('admin/manage-users.ejs', {
        title: 'Manage users',
        login: req.user,
        url: req.path,
        listUsers: listUsers
    });
});


module.exports = router;