const Wallet = require('../../models/Wallet.js')
const Payment = require('../../models/Payment.js')
const Cart = require('../../models/Carts.js')

module.exports = {
  update: async (req, res, next) => {
    try {
      if (!req.body.firstName || !req.body.lastName || !req.body.phone || !req.body.address) {
        return res.json({ error: "The compulsory information is not submitted." });
      } else {
        const balance = await Wallet.getCurrentBalance(req.body.id)
        const result = await Wallet.update(req.body.id, +req.body.total, balance.Balance);
  
        if (result == false){
          return res.json({ error: "Balance not enough!" });
        } else {
          if (req.body.cart) {
            let dateObject = new Date();
            dateObject.setHours(dateObject.getHours() + 7);
            let user_id = req.body.id, firstName = req.body.firstName, lastName = req.body.lastName, email = req.body.email, phone = req.body.phone, address = req.body.address, cart = req.body.cart;
            let date = dateObject.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            await Payment.add({User_id: user_id, Firstname: firstName, Lastname: lastName, Email: email, Phone: phone, Address: address, Content: JSON.stringify(cart), Date: date})
            await Cart.resetCart(req.body.id);
            return res.json({ success: "Purchase succeed" });
          } else {
            return res.json({ error: "There is nothing in your cart." });
          }
        }
      }
    } catch(error){
      next(error)
    }
  },
  
  store: async (req, res, next) => {
    console.log(1);
    try {
      await Wallet.add(req.body);
      res.json({ success: "Successfully create a digital wallet." });
    } catch(error){
      next(error)
    }
  }
}