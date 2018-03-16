const express = require('express');
let Order = require('./../models/order').Order;
let Entry = require('./../models/entry').Entry;

/**
 * Metodo que crea una orden con productos.
 * @param req
 * @param res
 * @param next
 */
function createOrder(req, res, next){

    let entriesId = [];
    let totalPerProd = 0.0;
    let totalEntries = 0.0;
    let totalOrder = 0.0;
    let iva = 0.0;

    Entry.find({"user": req.params.user, "product": req.params.prod}).populate("product").exec((err, entrys) => {
        if(err){
            res.status(500).json(err);
        }

        if(entrys.length > 0){

            entrys.forEach(e => {
                entriesId.push(e._id);
                totalPerProd += (e.product.price * e.cant);
                totalEntries += totalPerProd;
            });

            iva = totalEntries * .16;
            totalOrder = totalEntries + iva;

            let order = new Order({
                user: req.params.user,
                subtotal: totalEntries,
                iva: iva,
                total: totalOrder,
                entries: entriesId
            });

            order.save((err) => {
                if(err) {
                    res.status(500).json(err);
                }else{
                    res.status(200).json(order);
                }
            });
        }

    });
};

/**
 * Metodo que agrega un producto en una orden.
 * @param req
 * @param res
 * @param next
 */
function addEntryToOrder(req, res, next){

    let totalPerProd = 0.0;
    let iva = 0.0;

    Order.findOne({"_id": req.params.order}).exec((err, order) => {
        if(err){
            res.status(500).json(err);
        }

        Entry.find({"user": req.params.user, "product": req.params.prod}).populate("product").exec((err, entrys) => {
            if(err){
                res.status(500).json(err);
            }

            if(entrys.length > 0){
                entrys.forEach(e => {
                    order.entries.push(e._id);
                    totalPerProd += (e.product.price * e.cant);
                    order.subtotal += totalPerProd;
                });

                iva = order.subtotal * .16;
                order.total = order.subtotal + iva;

                order.save((err) => {
                    if(err) {
                        res.status(500).json(err);
                    }else{
                        res.status(200).json(order);
                    }
                });
            }

        });

    });
};

/**
 * Metodo que obtiene productos de una orden.
 * @param req
 * @param res
 * @param next
 */
function getProductsByOrder(req, res, next){

    Order.findOne({"_id": req.params.order, "user": req.params.user}).populate({path:"entries", populate:{path:"product", model:"Product"}}).exec((err, order) => {

        if(err){
            res.status(500).json(err);
        }

        res.status(200).json(order.entries);

    });
};

/**
 * Metodo que elimina un producto de la orden.
 * @param req
 * @param res
 * @param next
 */
function deleteProductFromOrder(req, res, next){

    let totalPerProd = 0.0;
    let iva = 0.0;
    let orderFoundEntries = [];

    Order.findOne({"_id": req.params.order, "user": req.params.user}).populate({path:"entries", populate:{path:"product", model:"Product"}}).exec((err, order) => {
        console.log()
        if(err){
            res.status(500).json(err);
        }

        orderFoundEntries = order.entries;


        orderFoundEntries.forEach((e,i) => {
            console.log("E" ,e);
        if(e.product._id == req.params.prod){
            console.log("ENTRE AL IF");
        order.entries.splice(i,1);
        console.log("ENTRIES ",order.entries);

        totalPerProd += (e.product.price * e.cant);
        order.subtotal -= totalPerProd;

        iva = order.subtotal * .16;
        order.total = order.subtotal + iva;

        order.save((err) => {
            if(err) {
                res.status(500).json(err);
            }else{
                res.status(200).json(order);
            }
        });
    }
});
    });



};

/**
 * Metodo que obtiene ordenes por usuario.
 * @param req
 * @param res
 * @param next
 */
function getOrderByUser(req, res, next){
    Order.find({"user": req.params.user}).exec((err, orders) => {

        if(err){
            res.status(500).json(err);
        }

        res.status(200).json(orders);

    });

};

/**
 * Metoodo que obtiene la orden por id.
 * @param req
 * @param res
 * @param next
 */
function getOrderById(req, res, next){
    Order.findOne({"user": req.params.user, "_id": req.params.order}).exec((err, order) => {

        if(err){
            res.status(500).json(err);
        }

        res.status(200).json(order);

    });

};

module.exports = {
    createOrder,
    addEntryToOrder,
    getProductsByOrder,
    getOrderByUser,
    getOrderById,
    deleteProductFromOrder
};