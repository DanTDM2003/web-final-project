const Wallet = require('../../models/Wallet.js')

module.exports = {
  update: async (req, res, next) => {
    try{
      const balance = await Wallet.getCurrentBalance(req.body.id)
      const result = await Wallet.update(req.body.id, +req.body.total, balance.Balance);
      if(result == false){
        res.json({error: "Balance not enough!"})
      }
      else
        res.json({})
    }
    catch(error){
      next(error)
    }
  }
}