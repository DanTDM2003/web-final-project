const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        url: req.url
    });
});

router.get('/contact', (req, res) => {
    res.render('index', {
        url: req.url
    });
});

module.exports = router;