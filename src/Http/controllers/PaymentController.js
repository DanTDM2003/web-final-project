const Payment = require('../../models/Payment.js');
const Carts = require('../../models/Carts.js');

const helpers = require('../../utilities/helpers.js');

module.exports = {
    index: async (req, res, next) => {
      try {
        const carts = await Carts.fetchWithUserId(req.user.id);
        res.render('product-manage/checkout', {
          title: 'Checkout',
          login: req.isAuthenticated(),
          user: req.user,
          url: req.path,
          carts: carts.Cart
        });
      } catch (error) {
        next(error)
      }  
    },

    destroy: async (req, res, next) => {
      if (!await Payment.fetch(req.body.id)) {
        return helpers.abort(req, res, 404);
      }
      await Payment.delete(req.body.id);
      res.redirect('back');
    }
}