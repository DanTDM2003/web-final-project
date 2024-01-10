const Wallet = require('../../models/Wallet.js')
const Payment = require('../../models/Payment.js')
const Cart = require('../../models/Carts.js')

module.exports = {
  update: async (req, res, next) => {
    try{
      const balance = await Wallet.getCurrentBalance(req.body.id)
      const result = await Wallet.update(req.body.id, +req.body.total, balance.Balance);
      if(result == false){
        res.json({error: "Balance not enough!"})
      }
      else{
        let dateObject = new Date();
        dateObject.setHours(dateObject.getHours() + 7);
        let user_id = req.body.id, firstName = req.body.firstName, lastName = req.body.lastName, email = req.body.email, phone = req.body.phone, address = req.body.address, cart = req.body.cart;
        let date = dateObject.toISOString().replace(/T/, ' ').replace(/\..+/, '')
        await Payment.add({User_id: user_id, Firstname: firstName, Lastname: lastName, Email: email, Phone: phone, Address: address, Content: JSON.stringify(cart), Date: date})
        await Cart.resetCart(req.body.id)
        res.json({success: "Purchase succeed"})
      }
    }
    catch(error){
      next(error)
    }
  }
}