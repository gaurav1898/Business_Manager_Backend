/* !!!: 
Reference links
Youtube : https://www.youtube.com/watch?v=JJ44WA_eV8E&feature=youtu.be
Developer : https://developers.google.com/oauthplayground/ 
google cloud : https://console.cloud.google.com/
Blog : https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

*/
'use strict';
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const xoauth2 = require('xoauth2');

// async function sendTo(email, subject, message){
//     // create reusable transporter object using the default SMTP transport
//     console.log(email +', ' +subject+', '+message);
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             type: "OAuth2",
//            // user: 'developer.webkodz@gmail.com',
//            user: 'developer.webkodz@gmail.com',
//             clientId : '896568899758-p1ukgpuns56obl81b3vrs89se60i7oh9.apps.googleusercontent.com',
//             clientSecret: 'rL1BtrY1PU8Qyzq--RN5B3t7',
//             refreshToken : '1//04iD0gKLiht-hCgYIARAAGAQSNwF-L9IrWRqeK4NgiOM0kf_AxparNs_H4v4B-hmzBnr99PUjAxszC0g3fszb4YRdo8Z3twio0tQ'
//         }
//         });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         // from: '"Webkodz Focus👻" <focus@webkodz.com>', // sender address
//         from: 'admin@mummeals', // sender address
//         to: email, // list of receivers
//         subject: subject, // Subject line
//         text: message, // plain text body
//         html: '<b>'+message+'</b>' // html body
//     });
    
//     console.log('Message sent: %s', info.messageId);
// }

async function sendTo(email, subject, message){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
        // user: 'developer.webkodz@gmail.com',
        user: 'developer.webkodz@gmail.com',
            clientId : '896568899758-p1ukgpuns56obl81b3vrs89se60i7oh9.apps.googleusercontent.com',
            clientSecret: 'rL1BtrY1PU8Qyzq--RN5B3t7',
            refreshToken : '1//04iD0gKLiht-hCgYIARAAGAQSNwF-L9IrWRqeK4NgiOM0kf_AxparNs_H4v4B-hmzBnr99PUjAxszC0g3fszb4YRdo8Z3twio0tQ'
        }
        });
        
        try{
        // var welcomMessage = "Congratulation \""+user.name+", You have successfully registered with us. Please Login back with your username and password"
        // create reusable transporter object using the default SMTP transport
        

        // send mail with defined transport object
        let info = await transporter.sendMail({
            // from: '"Webkodz Focus👻" <focus@webkodz.com>', // sender address
            from: "developer.webkodz@gmail.com", // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            // text: message, // plain text body
            html: message // html body
        });

        console.log('Message sent: %s', info.messageId);

    }catch(err){
        console.log("Oops Something went wrong")
        console.log("TRANSPORTER ERROR MESSAGE: " + err.message);
    }


}
module.exports.sendTo = sendTo;