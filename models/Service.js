const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const providerList = require('../seed/AuthProvider');
const statusList = require('../seed/Status');
const industryList = require('../seed/IndustryList');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: false
    },
    netAmount: {
        type: String,
        required: false
    },
    cgst: {
        type: String,
        required: false
    },
    sgst: {
        type: String,
        required: false
    },
    totalGst: {
        type: String,
        required: false,
    },
    totalAmount: {
        type: String,
        required: false,
    },
    taxType: {
        type: String,
        enum: statusList.TaxTypes,
        required: false,
        //seed usage for inclusive, exclusive and out of scope
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
const Service = module.exports = mongoose.model('Service', SCHEMA)