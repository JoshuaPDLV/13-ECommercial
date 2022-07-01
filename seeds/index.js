const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const Router = require('router')
const router = new Router()
loadRoutes(router, productsLoader)
app.use(router.routes())

module.exports = (router, productsLoader) => {
  router.get('/', async ctx => {
    const products = await productsLoader.all()
    ctx.state.model = {
      title: 'Hey there,',
      products: products
    }
    await ctx.render('home');
  })
}

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
