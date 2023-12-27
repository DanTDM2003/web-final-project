const productM = require('../../models/Products.js')
const Cookie = require('../../utilities/Cookies.js');
const JWTAction = require('../../utilities/JWTAction.js');

module.exports = {
  index: async (req, res, next) => {
    let conditions = ['', ''];
    if(req.query.search)
      conditions[0] = req.query.search
    if(req.query.category)
      conditions[1] = req.query.category
    try{
      const products = await productM.fetchAll(conditions);
      const categories = await productM.getAllCategories();
      res.render('product/index', {
        title: 'Products',
        login: req.user,
        url: req.path,
        products: products,
        categories: categories,
        query: req.query,
        page: Number(req.params.page),
        total: 3
    })
    }
    catch (error){
      next(error)
    }
  },
  getSingle: async (req, res, next) => {
    try{
      const user = Cookie.decodeCookie(req.signedCookies.user);
      const product = await productM.getProduct(req.params.id);
      const products = await productM.getRelatedProducts(req.params.id);
      const categories = await productM.getAllCategories();
      res.render('product/show', {
        title: 'Home',
        login: req.user,
        url: req.path.Cookie,
        product: product,
        categories: categories,
        products: products
    })
    }
    catch (error){
      next(error)
    }
  },
  getItemPerPage: async (req, res, next) => {
    try{
      const user = Cookie.decodeCookie(req.signedCookies.user);
      const products = await productM.getProducts(req.params.page, 10);
      const categories = await productM.getAllCategories()
      res.render('product/index', {
        title: 'Home',
        login: req.user,
        url: req.path.Cookie,
        products: products,
        categories: categories,
        page: Number(req.params.page),
        total: 3
    })
    }
    catch (error){
      next(error)
    }
  },
  getSameCategory: async (req, res, next)  => {
    try{
      const user = Cookie.decodeCookie(req.signedCookies.user);
      const products = await productM.getSameCategory(req.query.category)
      const categories = await productM.getAllCategories()
      res.render('product/index', {
        title: 'Home',
        login: req.user,
        url: req.path.Cookie,
        products: products,
        categories: categories,
        page: Number(req.params.page),
        total: 3
    })
    }
    catch (error){
      next(error)
    }
  },
}