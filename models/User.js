const mongoose = require('mongoose');
const roleList = require('../seed/Roles');
const statusList = require('../seed/Status');
const uniqueValidator = require('mongoose-unique-validator');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        match: [/\S+@\S+\.\S+/, "Invalid"]
    },
    password: {
        type: String,
        require: true
    },
    profileImage: {
        type: String,
        require: false
    },
    salt: {
        type: String
    },
    roles: {
        type: [
            {
                type: String,
                enum: roleList.Role
            }
        ],
        default: ['User']
    },
    status: {
        type: String,
        enum: statusList.User_status,
        default: 'InActive'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // companyProfile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'CompanyProfile'
    // },
    // userProfile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'UserProfile'
    // }
},
    {
        timestamps: true
    })

SCHEMA.plugin(uniqueValidator);
const User = module.exports = mongoose.model('User', SCHEMA)