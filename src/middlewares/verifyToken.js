const path = require('path');
require('dotenv').config({ path: path.join(__dirname, "..", "..", ".env") });
const jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET_KEY;
const issuer = process.env.ISSUER;
const audience = process.env.AUDIENCE;

function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent in the Authorization header
    if (!token) {
        return res.status(401).json({
            status: "fail",
            statusCode: 403,
            error: 'No token provided.'
        });
    }

    jwt.verify(
        token,
        key,
        { issuer, audience },
        function(error, decoded) {
            if (error) {
                return res.json({
                    status: "fail",
                    statusCode: 401,
                    error: "Unauthorized."
                })
            }
            req.decoded = decoded;
            next();
        }
    )
}

module.exports = verifyToken;