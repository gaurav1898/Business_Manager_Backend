'use strict';
const nodemailer = require('nodemailer');


//Step 1

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'developer.webkodz@gmail.com',
        pass:'dev@wk#2020'
    }
});

async function sendToNewUser(email, subject, message){
    //Step 2
    let mailOptions = {
        from : "Info@wbs.com",
        to : email,
        subject : subject,
        text : message
    }

    //Step 3
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log("Error Occours");
            console.log(err);
        }else{
            console.log("Email sent !!!");
        }
    })
}

module.exports.sendTo = sendToNewUser;