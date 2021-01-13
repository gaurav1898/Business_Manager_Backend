const mongoose = require('mongoose');
const ServiceSchema = require('../models/Service');
const ServiceService = require('../services/ServicesService');
const config = require('config')
const roleList = require('../seed/Roles');
const Email = require('../handler/node-mailer');

exports.GetCount = (req, res, next) => {
    ServiceService.GetCount((err, total) => {
        console.log(err)
        ServiceService.GetCountByStatus("Active", (err, active) => {
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
        ServiceService.GetAll((err, Service) => {
            if (err) {
                console.log(err)
            }
            return res.json({
                success: true,
                Service
            })
        })

    } else {
        ServiceService.GetAllForAdminUser((err, Service) => {
            if (err) {
                console.log(err)
            }
            return res.json({
                success: true,
                Service
            })
        })
    }
}

exports.GetByStatus = (req, res, next) => {
    ServiceService.GetByStatus(req.params.status, (err, Service) => {
        if (err) {
            console.log(err)
        }
        return res.json({
            success: true,
            Service
        })
    })
}

exports.Add = (req, res, next) => {
    // console.log(req.file.path)
    console.log(req.body)
    let formData = new ServiceSchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        netAmount: req.body.netAmount,
        cgst: netAmount / 100 * 9,
        sgst: netAmount / 100 * 9,
        totalGst: cgst + sgst,
        totalAmount: netAmorunt + totalGst,
        taxType: req.body.taxType,
        createdBy: req.tokenData.data._id,
    })
    console.log(formData)

    ServiceService.Add(formData, (err, Service) => {
        if (err) {
            // console.log(err);
            let message = [];
            if (err.errors.name) message.push("name is required.")
            if (err.errors.netAmount) message.push("netAmount is required.")

            return res.json({
                success: false,
                err_subject: "Error!!",
                err_message: message
            })
        } else {
            return res.json({
                success: true,
                Service
            })
        }
    })
    // return res.json({
    //     imageUrl:req.file.path
    // })
}

exports.GetById = (req, res, next) => {
    let id = req.params.id
    ServiceService.GetByID(id, (err, user) => {
        res.json({
            success: true,
            user
        })
    })
}

exports.Update = (req, res, next) => {
    console.log("performing update")
    const id = req.params.id;
    // const updateOps = {};
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    ServiceService.GetByID(id, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                err_subject: 'Error',
                err_message: "No Request found, If you found any issue please contact to technical team."
            })
        } else {
            ServiceService.Update(id, req.body.requestId, (err, data) => {
                if (err) {
                    let message = [];
                    console.log(err);
                    // if (err.errors.ServiceToServiceBoy) message.push("ServiceToServiceBoy is required.")
                    // if (err.errors.requestStatus) message.push("requestStatus is required.")
                    // if (err.errors.requestId) message.push("requestId is required.")
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
                        success_message: "Service request Updated Successfully.."
                    })
                }
            })

        }
    })
}

exports.UpdateStatus = (req, res, next) => {
    console.log(req.params._id)
    ServiceService.GetByID(req.params._id, (err, user) => {
        if (user) {
            if (user.status == "Active") {
                ServiceService.updateUserStatus(req.params._id, 'InActive', (err, data) => {
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
                            success_message: "User Status InActivated Successfully."
                        })
                    }
                })
            } else if (user.status == "InActive") {

                ServiceService.updateUserStatus(req.params._id, 'Active', (err, data) => {
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
                            success_message: "User Status Activated Successfully."
                        })
                    }
                })
            } else if (user.status == "DeActivate") {
                ServiceService.updateUserStatus(req.params._id, 'Active', (err, data) => {
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
                            success_message: "User Status Activated Successfully."
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
    ServiceService.deactivateUser(req.params._id, (err, success) => {
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
                success_message: 'Account Deactivated Successfully'
            })
        }
    })
}