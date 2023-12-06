require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const viewEngine = require('./config/viewEngine.js');
const port = process.env.PORT;
const host = process.env.HOST;
const secret = 'mysecret';

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser(secret));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

viewEngine(app);

app.use(require('./routes/web.js'));

app.listen(port, host, () => {
    console.log("Server has started.");
});