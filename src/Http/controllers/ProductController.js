const Products = require('../../models/Products.js');
const Categories = require('../../models/Categories.js');

module.exports = {
  index: async (req, res, next) => {
    let conditions = ['', ''];
    if (req.query.search) {
      conditions[0] = req.query.search;
    }

    if (req.query.category) {
      conditions[1] = req.query.category;
    }

    try{
      const products = await Products.fetchAll(conditions);
      const categories = await Categories.fetchAll();
      
      res.render('product/index', {
        title: 'Products',
        login: req.user,
        url: req.path,
        products: products,
        categories: categories,
        query: req.query,
        page: +req.params.page,
        total: Math.ceil(products.length / 9)
      })
    } catch (error){
      next(error)
    }


    // Perform pagination logic here to retrieve data based on requested page number
    // Example: Get data for page number "req.query.page"
    
  },
  
  show: async (req, res, next) => {
    try{
      const product = await Products.fetch(req.params.id);
      const products = await Products.fetchRelatedProducts(req.params.id);
      const categories = await Categories.fetchAll();
      res.render('product/show', {
        title: 'Home',
        login: req.user,
        url: req.path.Cookie,
        product: product,
        categories: categories,
        products: products
      })
    } catch (error){
      next(error)
    }
  },

  getItemPerPage: async (req, res, next) => {
    try{
      const products = await Products.getProducts(req.params.page, 10);
      const categories = await Products.getAllCategories()
      res.render('product/index', {
        title: 'Home',
        login: req.user,
        url: req.path.Cookie,
        products: products,
        categories: categories,
        page: +req.params.page,
        total: 3
      })
    } catch (error){
      next(error)
    }
  }
}