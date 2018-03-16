const express = require('express');
let User = require('./../models/user.js').User;

/**
 * Metodo que regresa una lista de todos los usuarios existentes en la base de datos.
 * @param req
 * @param res
 * @param next
 */
function getAllUsers(req, res, next){
    User.find({}).exec((err, users) => {
        if (err) {
            return res.json(err);
        }
        return res.json(users);
});
};

/**
 * Método pra agregar un usuario a la base de datos
 * @param req
 * @param res
 * @param next
 */
function addUser(req, res, next){

    let user = new User({
        name: req.body.name
    });

    user.save((err) => {
        if(err) {
            res.status(500).json(err);
        }else{
            res.status(200).json(user);
        }
    });
};

/**
 * Metodo para editar un usuario mediante idUser.
 * @param req
 * @param res
 * @param next
 */
function updateUser(req, res, next){
    User.update({_id:req.params.id},{$set:{"name":req.body.name}}).exec().then(user => {
        res.status(200).json(user);
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
function findUserByName(req, res, next){
    User.find({name: {$regex : "^" + req.params.str}}).exec((err, users) => {
        if(err) {
            res.status(500).json(err);
        }else{
            res.status(200).json(users);
        }
    });
};

/**
 * Metodo para eliminar un usuario mediante el idUser.
 * @param req
 * @param res
 * @param next
 */
function deleteUser(req, res, next) {
    User.findOne({_id: req.params.id}).exec((err, user) => {
        User.remove({_id: req.params.id},(err, object)=>{
            if(err){
                res.status(500).json(err);
            }else{
                res.status(200).json(object);
            }
        });
    });

};

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    findUserByName,
    deleteUser
};