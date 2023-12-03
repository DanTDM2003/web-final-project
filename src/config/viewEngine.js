const express = require('express');
const path = require('path');
const { create } = require('express-handlebars');

module.exports = (app) => {
    app.use(express.static(path.join('./src', 'public')));

    const hbs = create({
        extname: '.hbs'
    });
    
    app.engine('hbs', hbs.engine);

    app.set('views', path.join('./src', '/views'));
    app.set('view engine', 'hbs');
}
