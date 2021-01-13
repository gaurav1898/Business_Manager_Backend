const bcrypt = require('bcryptjs');
const Service = require('../models/Service');
var config = require('config');

module.exports.GetCount = function(callback){
    
    Service.find().count(callback);
}
module.exports.GetCountByStatus = function (status, callback){
    let query = {
        status:status
    }
    Service.find(query).count(callback);
}

module.exports.GetByID = function(id ,callback){
    Service.findById(id, callback)
}

module.exports.GetAll = function(callback){
    Service.find(callback);
}

module.exports.GetAllForAdminUser = function (callback){
    let ActiveStatusQuery = {
        status:"Active"
    }
    let InActiveStatusQuery = {
        status:"InActive"
    }
    Service.find({$or:[ActiveStatusQuery, InActiveStatusQuery]}, callback);
}

module.exports.GetByStatus = function (status, callback){
    let query = {
        status : status
    }
    Service.find(query, callback);
}

module.exports.Add = function (formData, callback){
    formData.save(callback);
}

module.exports.Update=function(id, updateData, callback){
    let query = {
        _id : id,
    }
    Service.update(query, {$set:updateData}, callback);
}

module.exports.updateUserStatus=function(UserId, status, callback){
    let query = {
        _id:UserId
    }
    let setStatus={
        status:status
    }
    Service.update(query,  {$set: setStatus}, callback);
}

module.exports.deactivateUser=function(UserId, callback){
    let query = {
        _id:UserId
    }
    let setStatus={
        status:'DeActivate'
    }
    Service.update(query,  {$set: setStatus}, callback);
}