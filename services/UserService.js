const bcrypt = require('bcryptjs');
const User = require('../models/User');
var config = require('config');

module.exports.GetCount = function (role, callback) {
    const query = {
        "roles": { $in: role }
    }
    User.find(query).count(callback);
}
module.exports.GetCountByStatus = function (role, status, callback) {
    let query = {
        "roles": { $in: role },
        status: status
    }
    User.find(query).count(callback);
}

module.exports.GetByID = function (id, callback) {
    User.findById(id).populate('companyProfile').exec(callback);
}

module.exports.GetListByRole = function (role, callback) {
    const query = {
        "roles": { $in: role }
    }
    User.find(query).populate(['companyProfile', 'userProfile']).exec(callback);
}

module.exports.Add = function (newUser, callback) {
    bcrypt.genSalt(config.get('App.SALT_ROUNDS'), (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.findUserByRole = function (email, contact, role, callback) {

    const queryByUsername = {
        email: email,
        "roles": { $in: role }
    }
    const queryByEmail = {
        contact: contact,
        "roles": { $in: role }
    }

    // console.log(queryByUsername)
    // console.log(User.findOne({$or:[queryByContact, queryByEmail, queryByUsername]}))
    User.findOne({ $or: [queryByEmail, queryByUsername] }, callback)
}

module.exports.comparePassword = function (password, hashPassword, callback) {
    bcrypt.compare(password, hashPassword, (err, isMatch) => {
        console.log("hashpassword :" + hashPassword)
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.updateUserStatus = function (UserId, status, callback) {
    let query = {
        _id: UserId
    }
    let setStatus = {
        status: status
    }
    User.update(query, { $set: setStatus }, callback);
}

module.exports.deactivateUser = function (UserId, callback) {
    let query = {
        _id: UserId
    }
    let setStatus = {
        status: 'DeActivate'
    }
    User.update(query, { $set: setStatus }, callback);
}

module.exports.Update = function (id, updateData, callback) {
    let query = {
        _id: id,
    }
    User.update(query, { $set: updateData }, callback);
}