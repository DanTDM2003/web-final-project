const UsersMigration = require('../migration/Users.js');
const ProductsMigration = require('../migration/Products.js');
const CategoriesMigration = require('../migration/Categories.js');
const CartsMigration = require('../migration/Carts.js');

const errors = {
    404: "Sorry. Page not found.",
    401: "You are unauthorized to see this page."
}

module.exports = {
    abort: (req, res, code=404) => {
        res.status(code).render('error', {
            title: code,
            message: errors[code],
            login: req.isAuthenticated(),
            user: req.user,
            url: req.path
        });
    },

    migrate: async () => {
        await UsersMigration();
        await CategoriesMigration();
        await ProductsMigration();
        await CartsMigration();
    },

    imageFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}