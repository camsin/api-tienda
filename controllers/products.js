const express = require('express');
let Product = require('./../models/product').Product;

/**
 * Metodo que regresa una lista de todos los productos existentes en la base de datos.
 * @param req
 * @param res
 * @param next
 */
function getAllProducts(req, res, next){
    Product.find({}).exec((err, products) => {
        if (err) {
            return res.json(err);
        }
        return res.json(products);
    });
};

/**
 * Metodo que te regresa una lista de productos por pagina.
 * Page es la pagina que se quiere visualizar.
 * Size es el numero de productos que se mostraran por pagina.
 * @param req
 * @param res
 * @param next
 */
function getProductsByPage(req, res, next){
    let page = Number(req.params.page);
    let size = Number(req.params.size);

    Product.find({}).limit(size).skip((page * size)-size)
        .exec().then(products => {
            res.status(200).json(products);
        }).catch(err => {
            res.status(500).json(err);
        });
}

/**
 * Método pra agregar un producto a la base de datos
 * @param req
 * @param res
 * @param next
 */
function addProduct(req, res, next){

    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save((err) => {
        if(err) {
            res.status(500).json(err);
        }else{
            res.status(200).json(product);
}
});
};

/**
 * Metodo para editar un producto mediante idProduct.
 * @param req
 * @param res
 * @param next
 */
function updateProduct(req, res, next){

    Product.update({_id:req.params.id},{$set:{"name": req.body.name, "price":req.body.price}}).exec().then(product => {
        res.status(200).json(product);
}).catch(err => {
        res.status(500).json(err);
});
}

/**
 * Metodo que realiza una busqueda mediante el nombre del usuario y regresa una lista de usuarios.
 * @param req
 * @param res
 * @param next
 */
function findProductByName(req, res, next){
    Product.find({name: {$regex : "^" + req.params.str}}).exec((err, products) => {
        if(err) {
            res.status(500).json(err);
        }else{
            res.status(200).json(products);
        }
    });
};

/**
 * Metodo para eliminar un producto mediante el idProduct.
 * @param req
 * @param res
 * @param next
 */
function deleteProduct(req, res, next) {
    Product.findOne({_id: req.params.id}).exec((err, user) => {
        Product.remove({_id: req.params.id},(err, object)=>{
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(object);
        }
    });
});

};

module.exports = {
    getAllProducts,
    getProductsByPage,
    addProduct,
    updateProduct,
    findProductByName,
    deleteProduct
};