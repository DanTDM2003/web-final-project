const express = require('express');
const router = express.Router();

const SessionController = require('../controllers/SessionController.js');
const AccountController = require('../controllers/AccountController.js');

router.route('/login')
        .get(SessionController.create)
        .post(SessionController.store);

router.get('/logout', SessionController.destroy);

router.route('/register')
        .get(AccountController.create)
        .post(AccountController.store);

module.exports = router;