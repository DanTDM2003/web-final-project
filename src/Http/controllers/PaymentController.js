const Payment = require('../../models/Payment.js');
const Carts = require('../../models/Carts.js')

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
}