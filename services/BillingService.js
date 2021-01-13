const bcrypt = require('bcryptjs');
const Billing = require('../models/Billing');
var config = require('config');

module.exports.GetCount = function (callback) {
    Billing.find().count(callback);
}
module.exports.GetCountByStatus = function (status, callback) {
    let query = {
        status: status
    }
    Billing.find(query).count(callback);
}

module.exports.GetByID = function (id, callback) {
    Billing.findById(id, callback)
}

module.exports.GetAll = function (callback) {
    // Billing.find(callback);
    let query = {
        nest: true
    }
    // NestedTable.find(condition, callback)
    Billing.find().exec(callback)
}

module.exports.GetAllForAdminUser = function (callback) {
    let ActiveStatusQuery = {
        status: "Active"
    }
    let InActiveStatusQuery = {
        status: "InActive"
    }
    Billing.find({ $or: [ActiveStatusQuery, InActiveStatusQuery] }).populate({ path: 'refid', populate: { path: 'refid', populate: { path: 'refid', populate: { path: 'refid', populate: { path: 'refid' } } } } }).exec(callback);
}

module.exports.GetByStatus = function (companyStatus, callback) {
    let query = {
        companyStatus: companyStatus
    }
    Billing.find(query, callback);
}

module.exports.Add = function (formData, callback) {
    formData.save(callback);
}

module.exports.Update = function (id, updateData, callback) {
    let query = {
        _id: id,
    }
    Billing.update(query, { $set: updateData }, callback);
}


module.exports.updateUserStatus = function (UserId, status, callback) {
    let query = {
        _id: UserId
    }
    let setStatus = {
        status: status
    }
    Billing.update(query, { $set: setStatus }, callback);
}

module.exports.deactivateUser = function (UserId, callback) {
    let query = {
        _id: UserId
    }
    let setStatus = {
        status: 'DeActivate'
    }
    Billing.update(query, { $set: setStatus }, callback);
}

module.exports.pushRefId = function (categoryId, subCategoryId, callback) {
    let id = {
        _id: categoryId
    }

    Billing.update(id, { $push: { refid: subCategoryId } }, { safe: true, upsert: true }, callback)

}
module.exports.updateCompanyStatus = function (UserId, companyStatus, callback) {
    let query = {
        _id: UserId
    }
    let setStatus = {
        companyStatus: companyStatus
    }
    Billing.update(query, { $set: setStatus }, callback);
}