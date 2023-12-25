const categoryM = require('../../models/Categories.js')
const Cookie = require('../../utilities/Cookies.js');
const JWTAction = require('../../utilities/JWTAction.js');

module.exports = {
  getAllCategories: async (req, res, next) => {
    try{
      const user = Cookie.decodeCookie(req.signedCookies.user);
      const categories = await categoryM.getAllCategories();
      console.log(categories)
      res.render('product/index', {
        title: 'Home',
        login: req.user,
        url: req.path.Cookie,
        categories: categories
      })
    }
    catch (error){
      next(error)
    }
  }
}