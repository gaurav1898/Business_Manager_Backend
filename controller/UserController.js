const mongoose = require('mongoose');
const UserSchema = require('../models/User');
const UserService = require('../services/UserService');
const config = require('config')
const Token = require('../handler/genToken');
const roleList = require('../seed/Roles');
const Email = require('../handler/node-mailer');

exports.GetCount = (req, res, next) => {
    if (req.params.role == "Admin") {
        let tempRole = roleList.AppAdminRoles;
        tempRole = tempRole.concat(roleList.AppAdminUserRoles);
        roleListControl = tempRole;
    } else if (req.params.role == "Employee") {
        roleListControl = roleList.AppEmployeeRoles;
    } else if (req.params.role == "User") {
        roleListControl = roleList.AppUserRoles;
    } else {
        res.status(404).json({
            success: false,
            err_subject: "Error !!",
            err_message: "Oops something went wrong."
        })
    }
    UserService.GetCount(roleListControl, (err, total) => {
        console.log(err)
        UserService.GetCountByStatus(roleListControl, "Active", (err, active) => {
            console.log(err)
            res.json({
                success: true,
                totalCount: total,
                active: active,
                inactive: total - active
            })
        })
    })
}

exports.GetList = (req, res, next) => {
    let roleListControl;
    // console.log(req.tokenData.data.roles.some(r=> ["Su"].includes(r)))
    // if(req.tokenData.data.roles.some(r=> ["Su"].includes(r))){
    //     roleListControl=roleList.AppAdminUserRoles;

    // }else{
    //     res.status(404).json({
    //         success:false,
    //         err_subject:"Error !!",
    //         err_message:"Oops something went wrong, Please check your URL call."
    //     })
    // }

    if (req.tokenData.data.roles.some(r => ["Su"].includes(r))) {
        if (req.params.role == "Admin") {
            let tempRole = roleList.AppAdminRoles;
            tempRole = tempRole.concat(roleList.AppAdminUserRoles);
            roleListControl = tempRole;
        } else if (req.params.role == "Employee") {
            roleListControl = roleList.AppEmployeeRoles;
        } else if (req.params.role == "User") {
            roleListControl = roleList.AppUserRoles;
            console.log("Fetching user with User role")
        } else {
            res.status(404).json({
                success: false,
                err_subject: "Error !!",
                err_message: "Oops something went wrong."
            })
        }
        console.log(roleListControl)
        UserService.GetListByRole(roleListControl, (err, user) => {
            // if(typeof user != "undefined" && user != null && user.length != null && user.length){
            //     console.log(user)
            //     res.json({
            //         success:true,
            //         user
            //     })
            // }else{
            //     console.log("There are no user to your account")
            //     res.json({
            //         success:false
            //     })
            // }
            res.json({
                success: true,
                user
            })
        })
    }

}

exports.GetById = (req, res, next) => {
    let id = req.params.id
    UserService.GetByID(id, (err, user) => {
        res.json({
            success: true,
            user
        })
    })
}

exports.GetRole = (req, res, next) => {
    if (req.params.role == "Admin") {
        let tempRole = roleList.AppAdminRoles;
        tempRole = tempRole.concat(roleList.AppAdminUserRoles);
        roleListControl = tempRole;
        res.json({
            success: true,
            roles: roleListControl
        })
    } else if (req.params.role == "Employee") {
        roleListControl = roleList.AppEmployeeRoles;
        res.json({
            success: true,
            roles: roleListControl
        })
    } else if (req.params.role == "User") {
        roleListControl = roleList.AppUserRoles;
        res.json({
            success: true,
            roles: roleListControl
        })
    } else {
        res.status(404).json({
            success: false,
            err_subject: "Error !!",
            err_message: "Oops something went wrong. Invalid Role Search"
        })
    }
}

exports.Add = (req, res, next) => {
    console.log("Creating User");
    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    let password = generateRandomString(7);
    let userId;
    if (req.tokenData.data._id) {
        userId = req.tokenData.data._id;
    }
    let formData = new UserSchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: password,
        profileImage: req.body.profileImage,
        roles: req.body.roles,
        salt: config.get('App.SALT_ROUNDS'),
        createdBy: userId
    })
    console.log(formData)
    UserService.Add(formData, (err, user) => {
        if (err) {
            let message = [];
            console.log(err);
            if (err.errors.name) message.push("Name is required.")
            if (err.errors.email) message.push("Invalid Email Address or Already Taken.")
            return res.json({
                success: false,
                err_subject: "Error !!",
                err_message: message
            })
        } else {
            //email id, subject, message
            // Email.sendTo(user.email, "Service Management System", "You have registered successfully now you can login with the below email id : " + user.email + " and password : " + password)
            return res.json({
                success: true,
                success_subject: "Success !!",
                success_message: "You have successfully registered the user."
            })
        }
    })

}

// exports.AddClient = (req, res, next) => {
//     console.log("Creating User");
//     function generateRandomString(length) {
//         var result = '';
//         var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         var charactersLength = characters.length;
//         for (var i = 0; i < length; i++) {
//             result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         }
//         return result;
//     }
//     let password = generateRandomString(7);
//     let userId;

//     let ProfileData = new CompanyProfileSchema({
//         _id: new mongoose.Types.ObjectId(),
//         companyName: req.body.companyName,
//         cin: req.body.cin,
//         email: req.body.email,
//         contact: req.body.contact,
//         address: req.body.address,
//         state: req.body.state,
//         city: req.body.city,
//         pincode: req.body.pincode,
//         industry: req.body.industry,
//         reqId: req.body.reqId,
//         contact2: req.body.contact2,
//         image: req.body.image,
//         reg_doc_image: req.body.reg_doc_image,
//         contactPerson: req.body.contactPerson,
//         contactPerson2: req.body.contactPerson2,
//         // createdBy: req.tokenData.data._id
//     })

//     console.log(ProfileData)
//     CompanyService.Add(ProfileData, (err, profile) => {
//         if (err) {
//             let message = [];
//             if (err.errors.companyName) message.push("Company Name is required.")
//             if (err.errors.cin) message.push("Invalid CIN or Already Taken.")
//             if (err.errors.email) message.push("Invalid Email Address or Already Taken.")
//             if (err.errors.contact) message.push("Invalid Contact Info or Already Taken.")
//             return res.json({
//                 success: false,
//                 err_subject: "Error !!!",
//                 err_message: message
//             })
//         } else {
//             console.log("company registered successfully")
//             let formData = new UserSchema({
//                 _id: new mongoose.Types.ObjectId(),
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: password,
//                 contact: req.body.contact,
//                 roles: ["User"],
//                 salt: config.get('App.SALT_ROUNDS'),
//                 provider: 'Local',
//                 companyProfile: profile._id
//             })
//             console.log(formData)

//             UserService.Add(formData, (err, user) => {
//                 console.log(password)
//                 if (err) {
//                     let message = [];
//                     console.log(err);
//                     if (err.errors.name) message.push("Name is required.")
//                     if (err.errors.email) message.push("Invalid Email Address or Already Taken.")
//                     if (err.errors.contact) message.push("Invalid Email Address or Already Taken.")
//                     return res.json({
//                         success: false,
//                         err_subject: "Error !!",
//                         err_message: message
//                     })
//                 } else {
//                     //email id, subject, message
//                     Email.sendTo(user.email, "Service Management System", "You have registered successfully now you can login with the below email id : " + user.email + " and password : " + password)
//                     return res.json({
//                         success: true,
//                         success_subject: "Success !!",
//                         success_message: "You have successfully registered the Company."
//                     })
//                 }
//             })
//         }
//     })

// }

exports.SignIn = (req, res, next) => {
    console.log("Processing Login");
    console.log(req.body);
    let roleListControl;

    if (req.params.role == "Admin") {
        let tempRole = roleList.AppAdminRoles;
        tempRole = tempRole.concat(roleList.AppAdminUserRoles);
        tempRole.push("Su");
        roleListControl = tempRole;
        console.log(roleListControl)
    } else if (req.params.role == "Employee") {
        roleListControl = roleList.AppEmployeeRoles;
    } else if (req.params.role == "User") {
        roleListControl = roleList.AppUserRoles;
    } else {
        res.status(404).json({
            success: false,
            err_subject: "Error !!",
            err_message: "Oops something went wrong."
        })
    }
    console.log(req.body.email)
    UserService.findUserByRole(req.body.email, req.body.email, roleListControl, (err, user) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                success: false,
                err_subject: "Authentication Error",
                err_message: err
            })
        }
        if (!user) {
            console.log("Invalid email, username, password");
            res.status(400).json({
                success: false,
                err_subject: "Authentication Error",
                err_message: "Invalid Authentication, Please check your login name and password"
            });
        }
        if (user) {
            UserService.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    console.log("Invalid Password")
                    res.status(400).json({
                        success: false,
                        err_subject: "Authentication Error",
                        err_message: "Invalid Authentication, Please check your login name and password"
                    });
                }
                if (isMatch) {
                    console.log("user found")
                    // console.log(user)
                    if (user.status == "Active") {
                        const token = Token.generateToken(user);
                        // console.log(token);
                        return res.json({
                            success: true,
                            // user:user,
                            role: user.roles,
                            token: "JWT " + token
                        })
                    } else if (user.status == "InActive") {
                        return res.status(403).json({
                            success: false,
                            err_subject: "Login Failed",
                            err_message: "Your account is InActive, Please contact your Admin."
                        })
                    } else if (user.status == "DeActivated") {
                        return res.status(403).json({
                            success: false,
                            err_subject: "Login Failed",
                            err_message: "Your account have been DeActivated, Please contact your admin."
                        })
                    } else {
                        return res.status(400).json({
                            success: false,
                            err_subject: "Oops",
                            err_message: "Something went wrong. Please contact technical support"
                        })
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        err_subject: "Authentication Error",
                        err_message: "Wrong Password"
                    })
                }
            })

        }

    })
}

exports.UpdateStatus = (req, res, next) => {
    console.log(req.params._id)
    UserService.GetByID(req.params._id, (err, user) => {
        if (user) {
            if (user.status == "Active") {
                UserService.updateUserStatus(req.params._id, 'InActive', (err, data) => {
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

                UserService.updateUserStatus(req.params._id, 'Active', (err, data) => {
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
                UserService.updateUserStatus(req.params._id, 'Active', (err, data) => {
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
    UserService.deactivateUser(req.params._id, (err, success) => {
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

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    UserService.GetByID(id, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                err_subject: 'Error',
                err_message: "No user found, If you found any issue please contact to technical team."
            })
        } else {
            UserService.Update(id, updateOps, (err, data) => {
                if (err) {
                    let message = [];
                    console.log(err);
                    if (err.errors.name) message.push("Name is required.")
                    if (err.errors.email) message.push("Invalid Email Address or Already Taken.")
                    if (err.errors.contact) message.push("Invalid Email Address or Already Taken.")
                    
                    return res.json({
                        success: false,
                        err_subject: "Error !!",
                        err_message: message
                    })
                } else {
                    Email.sendTo(user.email, "Service Management System", "You Account has updated successfully <br> below are the update details <br>" + updateOps)
                    
                    return res.json({
                        success: true,
                        success_subject: "Success !!",
                        success_message: "You have successfully Updated the user."
                    })
                }
            })

        }
    })
}
