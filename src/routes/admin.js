const express = require('express');
const router = express.Router();
const UserR = require('./../models/Users.js')

const Cookie = require('../utilities/Cookies.js');
const JWTAction = require('../utilities/JWTAction.js');
const multer = require('multer');
const appRoot = require('app-root-path');
const path = require('path');
router.get('/', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const listUsers = await UserR.getAllUsers();
    res.render('admin/index', {
        title: 'Dashboard',
        login: req.user,
        url: req.path,
        listUsers: listUsers
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
    res.render('admin/manage-users.ejs', {
        title: 'Manage users',
        login: req.user,
        url: req.path,
        listUsers: listUsers
    });
});
router.get('/add-product', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const listUsers = await UserR.getAllUsers();
    // console.log("listUsers: ", listUsers);
    res.render('admin/add-product.ejs', {
        title: 'Manage users',
        login: req.user,
        url: req.path,
        listUsers: listUsers
    });
});

router.post('/update', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const changedListUsers = JSON.parse(req.body.changedUsers);
    // console.log("listUsers: ", changedListUsers);
    await UserR.updateListUsers(changedListUsers);
    // const listUsers = await UserR.getAllUsers();
    res.redirect("/admin")
    // res.render('admin/manage-users.ejs', {
    //     title: 'Manage users',
    //     login: req.user,
    //     url: req.path,
    //     listUsers: listUsers
    // });
});
router.get('/delete/:id', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const userId = req.params.id;
    // console.log("ID: ", userId);
    await UserR.deleteUser(userId);
    // const listUsers = await UserR.getAllUsers();
    // console.log("listusers");
    res.redirect("/admin")
    // res.render('admin/manage-users.ejs', {
    //     title: 'Manage users',
    //     login: req.user,
    //     url: req.path,
    //     listUsers: listUsers
    // });
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, appRoot + "/src/public/img/products");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {

        const userId = req.body.user_id || 'default';
        console.log(file.fieldname)
        cb(null, userId + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
router.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    res.redirect("/admin")
});


module.exports = router;