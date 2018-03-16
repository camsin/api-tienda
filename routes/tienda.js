var express = require('express');
var router = express.Router();
const productController = require('../controllers/products');
const userController = require('./../controllers/users');
const orderController = require('./../controllers/orders');
const entryController = require('./../controllers/entrys');


/* GET users listing. */
router.get('/', function(req, res, next) {
   res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});


/****** USERS *******/

router.get('/users', userController.getAllUsers);

router.post('/user/q', userController.addUser);

router.put('/user/:id', userController.updateUser);

router.get('/user/q/:str', userController.findUserByName);

router.delete('/user/:id', userController.deleteUser);

/****** PRODUCTS *********/

router.get('/products', productController.getAllProducts);

router.get('/products/:page/:size', productController.getProductsByPage);

router.post('/product/q', productController.addProduct);

router.put('/product/:id', productController.updateProduct);

router.get('/product/q/:str', productController.findProductByName);

router.delete('/product/:id', productController.deleteProduct);

/**************** ENTRYS *********************/

router.post('/entry/:user/:prod/:cant', entryController.addEntry);

router.get('/entrys/byUser/:id', entryController.getEntrysByUser);

router.get('/entrys/byUserAndProduct/:id/:prod', entryController.getEntrysByUserAndProduct);

router.delete('/entrys/byUser/:id', entryController.deleteEntryByUser);

router.delete('/entrys/byProduct/:id', entryController.deleteEntryByProduct);

router.delete('/entry/:id', entryController.deleteEntryById);


/*************** ORDERS **************/

router.post('/order/new/:user/:prod', orderController.createOrder);

router.post('/order/:order/:user/:prod', orderController.addEntryToOrder);

router.get('/order/:order/:user/prods', orderController.getProductsByOrder);

router.post('/order/:order/:user/prods/delete/:prod', orderController.deleteProductFromOrder);

router.get('/orders/byUser/:user', orderController.getOrderByUser);

router.get('/:user/order/:order', orderController.getOrderById);






module.exports = router;
