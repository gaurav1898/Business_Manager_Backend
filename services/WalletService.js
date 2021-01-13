const bcrypt = require('bcryptjs');
const Wallet = require('../models/Wallet');
var config = require('config');

module.exports.GetCount = function(callback){
    
    Wallet.find().count(callback);
}
module.exports.GetCountByStatus = function (status, callback){
    let query = {
        status:status
    }
    Wallet.find(query).count(callback);
}

module.exports.GetByID = function(id ,callback){
    Wallet.findById(id, callback)
}

module.exports.GetAll = function(callback){
    Wallet.find(callback);
}

module.exports.GetAllForAdminUser = function (callback){
    let ActiveStatusQuery = {
        status:"Active"
    }
    let InActiveStatusQuery = {
        status:"InActive"
    }
    Wallet.find({$or:[ActiveStatusQuery, InActiveStatusQuery]}, callback);
}

module.exports.GetByStatus = function (status, callback){
    let query = {
        status : status
    }
    Wallet.find(query, callback);
}

module.exports.Add = function (formData, callback){
    formData.save(callback);
}

module.exports.Update=function(id, updateData, callback){
    let query = {
        _id : id,
    }
    Wallet.update(query, {$set:updateData}, callback);
}

module.exports.updateUserStatus=function(UserId, status, callback){
    let query = {
        _id:UserId
    }
    let setStatus={
        status:status
    }
    Wallet.update(query,  {$set: setStatus}, callback);
}

module.exports.deactivateUser=function(UserId, callback){
    let query = {
        _id:UserId
    }
    let setStatus={
        status:'DeActivate'
    }
    Wallet.update(query,  {$set: setStatus}, callback);
}