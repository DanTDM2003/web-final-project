const Categories = require('../../models/Categories.js')

module.exports = {
  index: async (req, res, next) => {
    try {
      const categories = await Categories.fetch();
      res.render('product/index', {
        title: 'Home',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path.Cookie,
        categories: categories
      })
    }
    catch (error) {
      next(error)
    }
  },
  update: async (req, res) => {
    const changedListCategories = JSON.parse(req.body.changedCategories);
    console.log("changeList", changedListCategories);
    await Categories.updateListCategories(changedListCategories);
    res.redirect("back");
  },
  store: async (req, res) => {
    const data = req.body;
    const category = {
      Name: data.Name,
    }
    await Categories.add(category);
    res.redirect("back");
  }
}