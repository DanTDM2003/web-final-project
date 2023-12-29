const express = require('express');
const router = express.Router();
const UserR = require('./../models/Users.js')
const ProductM = require('./../models/Products.js')
const Cookie = require('../utilities/Cookies.js');
const JWTAction = require('../utilities/JWTAction.js');
const multer = require('multer');
const appRoot = require('app-root-path');
const path = require('path');
router.get('/', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const listUsers = await UserR.getAllUsers();
    const listProducts = await ProductM.getAllProducts();
    res.render('admin/index.ejs', {
        title: 'Dashboard',
        login: req.user,
        url: req.path,
        listUsers: listUsers,
        listProducts: listProducts
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
});

router.get('/delete/:tbName/:id', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    const Id = req.params.id;
    const tbName = req.params.tbName;
    console.log(tbName);
    // console.log("ID: ", userId);
    if (tbName === "users") {
        await UserR.deleteUser(Id);
    }
    else if (tbName === "products") {
        await ProductM.deleteProduct(Id)
    }
    // const listUsers = await UserR.getAllUsers();
    // console.log("listusers");
    res.redirect("/admin")
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img/products");
    },

    // By default, multer removes file extensions so let's add them back
    filename: async function (req, file, cb) {
        const idObj = await ProductM.getMaxID();
        const proId = await idObj.max + 1;
        cb(null, proId + '-' + Date.now() + path.extname(file.originalname));
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
router.post('/upload-product', upload.single('profile_pic'), async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    const data = req.body;
    const product = {
        name: data.productName,
        star: 0,
        price: data.price,
        short_description: data.shortDescription,
        quantity: data.quantity,
        full_description: data.fullDescription,
        catID: 2
    }
    await ProductM.add("Product", product);
    res.redirect("/admin")
});
router.post('/edit-product', async (req, res) => {
    const user = Cookie.decodeCookie(req.signedCookies.user);
    console.log("edit");
    const changedListProducts = JSON.parse(req.body.changedProducts);

    // console.log("listUsers: ", changedListUsers);
    await ProductM.updateListProducts(changedListProducts);
    // const listUsers = await UserR.getAllUsers();
    res.redirect("/admin")
    // res.render('admin/manage-users.ejs', {
    //     title: 'Manage users',
    //     login: req.user,
    //     url: req.path,
    //     listUsers: listUsers
    // });
});


module.exports = router;