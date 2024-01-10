require('dotenv').config()
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const https = require('https');
var cors = require('cors')


const app = express();

const port = process.env.PORT;
const host = process.env.HOST;
const secret = process.env.COOKIE_SECRET_KEY;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(require('../src/routes/api.js'))

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;

    next(error);
});

const server = https.createServer(
    {
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem")
    },
    app
)

server.listen(8001, host, () => {
    console.log(`Server has started on https://localhost:${8001}.`);
});