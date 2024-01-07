const Carts = require('../../models/Carts.js');

module.exports = {
    index: async (req, res, next) => {
        try {
            const cart = await Carts.fetchWithUserId(req.user.id);
            res.render('product-manage/cart', {
                title: 'Cart',
                login: req.isAuthenticated(),
                user: req.user,
                url: req.path,
                cart: cart.Cart
            });
        } catch (error) {
            next(error)
        }
    },

    store: async (req, res) => {
        const currentCart = await Carts.fetchWithUserId(req.user.id);
        let product = currentCart.Cart.find(el => {
            if (el.product.product_id === JSON.parse(req.body.product).product_id) {
                el.quantity = +el.quantity + +req.body.quantity;
                console.log(el.quantity);
                return el;
            }
        });

        if (!product) {
            const item = {
                product: JSON.parse(req.body.product),
                quantity: +req.body.quantity
            }
            currentCart.Cart.push(item);
        }

        currentCart.Cart = JSON.stringify(currentCart.Cart);
        await Carts.update(currentCart);

        res.json({});
    },

    update: async (req, res) => {
        let currentCart = await Carts.fetchWithUserId(req.user.id);

        currentCart.Cart.forEach((element, index) => {
            element.quantity = +req.body.quantities[index];
        });

        currentCart.Cart = currentCart.Cart.filter(el => {
            if (el.quantity > 0) {
                return el;
            }
        });

        currentCart.Cart = JSON.stringify(currentCart.Cart);
        await Carts.update(currentCart);

        res.json({});
    },

    delete: async (req, res) => {
        let currentCart = await Carts.fetchWithUserId(req.user.id);
        currentCart.Cart = currentCart.Cart.filter(el => {
            if (el.product.product_id !== +req.params.id) {
                return el;
            }
        });

        currentCart.Cart = JSON.stringify(currentCart.Cart);
        await Carts.update(currentCart);

        res.redirect('back');
    }
}