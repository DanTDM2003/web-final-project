const Categories = require('../../models/Categories.js')

module.exports = {
  index: async (req, res, next) => {
    try{
      const categories = await Categories.fetch();
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