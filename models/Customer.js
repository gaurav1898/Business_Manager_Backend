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
    mobile: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        index: true,
        match: [/\S+@\S+\.\S+/, "Invalid"],
    },
    alternateMobile: {
        type: String,
        required: false
    },
    dob: {
        type: String,
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
const Customer = module.exports = mongoose.model('Customer', SCHEMA)