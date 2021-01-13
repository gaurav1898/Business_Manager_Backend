    const mongoose = require('mongoose');
const UserSchema = require('../../models/User');
const UserService = require('../../services/UserService');
const config = require('config')
const Token = require('../../handler/genToken');
const roleList = require('../../seed/Roles');
const Email = require('../../handler/email');

exports.Add = (req, res, next) => {
    console.log("Creating User");
    
    let formData = new UserSchema({
        _id : new mongoose.Types.ObjectId(),
        name: "varun singh",
        email:"varun@webkodz.com",
        password:"varunsingh",
        roles : ["Su"],
        status : "Active",
    })
        UserService.Add(formData, (err, user) => {   // if(err.errors.contact){
            //     console.log("contact validation error");
            // }
        if(err){
            let message = [];
            if(err.errors.name){
                console.log("name validation error");
            }
            if(err.errors.email){
                console.log("email validation error");
            }
            // if(err.errors.contact){
            //     console.log("contact validation error");
            // }
            if(err.errors.name) message.push("Name Required.")
            if(err.errors.email) message.push("Invalid Email Address or Already Taken.")
            // if(err.errors.contact) message.push("Invalid Mobile Number or Already Taken.") 
            // return res.json({
            //     success : false,
            //     err_subject : "Error !!",
            //     err_message : message
            // })
            console.log("Error !!");
            // console.log(err)
            console.log(message)
        }else{
            // return res.json({
            //     success:true,
            //     success_subject:"Success !!",
            //     success_message : "You have successfully registered the user."
            // })
            console.log("Success !!");
            console.log("Admin User Created Successfully !!")
        }
    })
    
}
