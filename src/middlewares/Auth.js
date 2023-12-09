module.exports = (req, res, next) => {
    if (!req.signedCookies.user) {
        return res.redirect('/');
    }
    next();
}