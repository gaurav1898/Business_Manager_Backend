const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const industryList = require('../seed/IndustryList');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false,
    },
    billDate: {
        type: Date,
        required: false
    },
    billNumber: {
        type: Number,
        required: false
    },
    paymentMethod: {
        type: String,
        required: false
        //have to implement dynamically for adding a new payment method at the time of generation of a new bill.
    },
    staffName: {
        type: String,
        required: false,
    },
    checkInTime: {
        type: String,
        required: false,
    },
    checkOutTime: {
        type: String,
        required: false,
    },
    roomNumber: {
        type: String,
        required: false,
    },
    salesPerson: {
        type: String,
        required: false,
    },
    customerReview: {
        type: String,
        required: false,
    },
    serviceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: false,
    },
    walletId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: false,
    },
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
},
    {
        timestamps: true
    })

SCHEMA.plugin(uniqueValidator);
const Billing = module.exports = mongoose.model('Billing', SCHEMA)