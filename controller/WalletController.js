const mongoose = require('mongoose');
const WalletSchema = require('../models/Wallet');
const WalletService = require('../services/WalletService');
const config = require('config')
const roleList = require('../seed/Roles');
const Email = require('../handler/node-mailer');


exports.GetCount = (req, res, next) => {
    WalletService.GetCount((err, total) => {
        console.log(err)
        WalletService.GetCountByStatus("Active", (err, active) => {
            console.log(err)
            return res.json({
                success: true,
                totalCount: total,
                active: active,
                inactive: total - active
            })
        })
    })
}

exports.GetAll = (req, res, next) => {
    if (req.tokenData.data.roles.some(r => ["Su"].includes(r))) {
        WalletService.GetAll((err, profile) => {
            if (err) {
                console.log(err)
            }
            return res.json({
                success: true,
                profile
            })
        })

    } else {
        WalletService.GetAllForAdminUser((err, profile) => {
            if (err) {
                console.log(err)
            }
            return res.json({
                success: true,
                profile
            })
        })
    }
}

exports.GetByStatus = (req, res, next) => {
    WalletService.GetByStatus(req.params.companyStatus, (err, profile) => {
        if (err) {
            console.log(err)
        }
        return res.json({
            success: true,
            profile
        })
    })
}

exports.GetById = (req, res, next) => {
    let id = req.params.id
    WalletService.GetByID(id, (err, profile) => {
        res.json({
            success: true,
            profile
        })
    })
}

exports.Add = (req, res, next) => {
    console.log(req.body)
    let formData = new WalletSchema({
        _id: new mongoose.Types.ObjectId(),
        customerData: req.body.customerData,
        walletBalance: req.body.walletBalance,
        status: req.body.status,
        createdBy: req.tokenData.data._id
    })
    console.log(formData)

    WalletService.Add(formData, (err, company) => {
        if (err) {
            console.log(err);
            let message = [];
            if (err.errors.customerData) message.push("customerData is required.")
            if (err.errors.walletBalance) message.push("Wallet Balance is required.")

            return res.json({
                success: false,
                err_subject: "Error!!",
                err_message: message
            })
        }
        else {
            return res.json({
                success: true,
                message: "Sucessfully added",
                company
            })
        }
    })
    // return res.json({
    //     imageUrl:req.file.path
    // })
}
exports.Update = (req, res, next) => {
    console.log("performing update")
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    WalletService.GetByID(id, (err, profile) => {
        if (err) {
            return res.json({
                success: false,
                err_subject: 'Error',
                err_message: "No Warehouse found, If you found any issue please contact to technical team."
            })
        } else {
            WalletService.Update(profile._id, updateOps, (err, data) => {
                if (err) {
                    let message = [];
                    console.log(err);
                    if (err.errors.name) message.push("Name is required.")
                    if (err.errors.email) message.push("Invalid Email Address or Already Taken.")
                    if (err.errors.contact) message.push("Invalid Email Address or Already Taken.")
                    if (err.errors.address) message.push("Address is required.")
                    if (err.errors.city) message.push("City is required.")
                    if (err.errors.state) message.push("State is required.")
                    if (err.errors.pincode) message.push("Pincode is required.")
                    return res.json({
                        success: false,
                        err_subject: "Error !!",
                        err_message: message
                    })
                } else {
                    // Email.sendTo(user.email, "Service Management System", "You Account has successfully Registered a warehouse."+updateOps )
                    return res.json({
                        success: true,
                        success_subject: "Success !!",
                        success_message: "Warehouse Updated Successfully.."
                    })
                }
            })
        }
    })
}

exports.UpdateStatus = (req, res, next) => {
    console.log(req.params._id)
    WalletService.GetByID(req.params._id, (err, user) => {
        if (user) {
            if (user.status == "Active") {
                WalletService.updateUserStatus(req.params._id, 'InActive', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "profile Status InActivated Successfully."
                        })
                    }
                })
            } else if (user.status == "InActive") {

                WalletService.updateUserStatus(req.params._id, 'Active', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "profile Status Activated Successfully."
                        })
                    }
                })
            } else if (user.status == "DeActivate") {
                WalletService.updateUserStatus(req.params._id, 'Active', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "profile Status Activated Successfully."
                        })
                    }
                })

            }
        }
        if (err) {
            res.json({
                success: false,
                err_subject: 'unhandled',
                err_message: err
            })
        }
    });
}

exports.DeActivateUser = (req, res, next) => {
    console.log(req.params._id)
    WalletService.deactivateUser(req.params._id, (err, success) => {
        if (err) {
            res.json({
                success: false,
                err_subject: 'Error!!',
                err_message: 'Oops Something went wrong, Please contact your admin'
            })
        }
        if (success) {
            res.json({
                success: true,
                success_subject: 'Success!!',
                success_message: 'profile Deactivated Successfully'
            })
        }
    })
}

exports.updateWalletStatus = (req, res, next) => {
    console.log(req.params._id)
    WalletService.GetByID(req.params._id, (err, company) => {
        if (company) {
            if (company.companyStatus == "Pending") {
                WalletService.updateCompanyStatus(req.params._id, 'Accepted', (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            err_subject: "Error..",
                            err_message: err
                        })
                    }
                    if (data) {
                        res.json({
                            success: true,
                            success_subject: "Success!!",
                            success_message: "profile Status Accepted Successfully."
                        })
                    }
                })
            }
        }
        if (err) {
            res.json({
                success: false,
                err_subject: 'unhandled',
                err_message: err
            })
        }
    });
}