module.exports = (req, res, next) => {
    if (req.isUnauthenticated()) {
        return res.redirect('/');
    }
    next();
}