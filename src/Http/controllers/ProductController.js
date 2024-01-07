const sharp = require('sharp');
const path = require('path');

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
    try {
      const products = await Products.fetchAll(conditions);
      const categories = await Categories.fetchAll();
      
      res.render('product/index', {
        title: 'Products',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path,
        products: products,
        categories: categories,
        query: req.query,
        page: +req.params.page,
        total: Math.ceil(products.length / 9)
      })
    } catch (error) {
      next(error)
    }
  },
  
  show: async (req, res, next) => {
    try {
      const product = await Products.fetch(req.params.id);
      const products = await Products.fetchRelatedProducts(req.params.id);
      const categories = await Categories.fetchAll(); 

      res.render('product/show', {
        title: 'Product',
        login: req.isAuthenticated(),
        user: req.user,
        url: req.path.Cookie,
        product: product,
        categories: categories,
        products: products
      });
    } catch (error){
      next(error)
    }
  },

  destroy: async (req, res) => {
    const id = req.params.id;
    if (!(await Products.fetch(id))) {
      return helpers.abort(req, res, 404);
    } else {
      await Products.delete(id);
    }

    res.redirect("back");
  },

  update: async (req, res) => {
    const changedListProducts = JSON.parse(req.body.changedProducts);
    await Products.updateListProducts(changedListProducts);

    res.redirect("back");
  },

  store: async (req, res) => {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image to upload');
    }

    const resizedThumbnail = await sharp(req.file.path).resize(300, 363).toBuffer();
    const outputThumbnailPath = path.join(__dirname, `/../../public/img/thumbnails/${req.file.filename}`);
    await sharp(resizedThumbnail).toFile(outputThumbnailPath);

    const data = req.body;
    const product = {
      Name: data.Name,
      Rating: 0,
      Price: data.Price,
      Short_Description: data.Short_Description,
      Quantity: data.Quantity,
      Full_Description: data.Full_Description,
      Category_id: data.Category_id,
      Thumbnail: req.file.filename
    }
    await Products.add(product);

    res.redirect("back");
  }
}