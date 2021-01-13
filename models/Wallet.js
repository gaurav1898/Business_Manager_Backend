const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    },
    walletBalance: {
        type: Number,
        require: false
    },
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    })

SCHEMA.plugin(uniqueValidator);
const Warehouse = module.exports = mongoose.model('Warehouse', SCHEMA)