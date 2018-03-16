const express = require('express');
let Entry = require('./../models/entry').Entry;

/**
 * Metodo que regresa una lista de todas las entradas existentes por usuario.
 * @param req
 * @param res
 * @param next
 */
function getEntrysByUser(req, res, next){
    Entry.find({"user": req.params.id}).populate("user").populate("product").exec((err, entrys) => {
        if (err) {
            console.log("ERR", err);
            return res.json(err);
        }
        return res.json(entrys);
    });
};

function getEntrysByUserAndProduct(req, res, next){
    Entry.find({"user": req.params.id, "product": req.params.prod}).populate("user").populate("product").exec((err, entrys) => {
        if (err) {
            console.log("ERR", err);
            return res.json(err);
        }
        return res.json(entrys);
    });
};

/**
 * Método para agregar una entrada a la base de datos
 * @param req
 * @param res
 * @param next
 */
function addEntry(req, res, next){

    let entry = new Entry({
        user: req.params.user,
        product:req.params.prod,
        cant: req.params.cant
    });

    entry.save((err) => {
        if(err) {
            res.status(500).json(err);
        }else{
            res.status(200).json(entry);
        }
    });
};

/**
 * Metodo que elimina entradas por usuario
 * @param req
 * @param res
 * @param next
 */
function deleteEntryByUser(req, res, next){
    Entry.find({"user": req.params.id}).exec().then(entries => {
        if (entries.length > 0){
            entries.forEach(e => {
                Entry.remove({_id: e._id},(err, object)=>{
                    if(err){
                        res.status(500).json(err);
                    }else{
                        res.status(200).json(object);
                    }
                });
            });
        }
    }).catch(err => {
        res.status(500).json(err);
    });
};

/**
 * Metodo que elimina entradas por producto
 * @param req
 * @param res
 * @param next
 */
function deleteEntryByProduct(req, res, next){
    Entry.find({"product": req.params.id}).exec().then(entries => {
        entries.forEach(e => {
            console.log("E", e);
            Entry.remove({_id: e._id},(err, object)=>{
                if(err){
                    res.status(500).json(err);
                }else{
                    res.status(200).json(object);
                }
            });
        });
    }).catch(err => {
        res.status(500).json(err);
    });
};

/**
 * Metodo que elimina entrada por id.
 * @param req
 * @param res
 * @param next
 */
function deleteEntryById(req, res, next){
    Entry.findOne({"_id": req.params.id}).exec().then(entry => {
        Entry.remove({_id: entry._id},(err, object)=>{
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(object);
            }
        });
    }).catch(err => {
            res.status(500).json(err);
    });
};

module.exports = {
    getEntrysByUser,
    getEntrysByUserAndProduct,
    deleteEntryByUser,
    deleteEntryByProduct,
    deleteEntryById,
    addEntry
};