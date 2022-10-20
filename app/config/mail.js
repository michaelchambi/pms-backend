const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require('nodemailer');

module.exports = {
    transport: nodemailer.createTransport({
        host: process.env.Mail_Host,
        port: process.env.Mail_Port,
        auth: {
            user: process.env.Mail_User,
            pass: process.env.Mail_Pass
        }
    }),

    mail(email, fullname, password) {
        return mailOptions = {
            from: '"Judiciary Team" <info@judiciary.go.tz>',
            to: email,
            subject: 'Activate Account',
            text: 'Hey there, it mail from Judiciary of Tanzania ',
            html: 'Hello! ' + fullname + '<br><br> Your account with the e-mail address: ' + email + ' has been created.<br><br>Please follow the button below to activate your account.<br><br>Activation code: ' + password + '<br><br><a href="http://localhost:4200/activate-account" style="background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Activate Account</a><br><br><br><br><b>The Judiciary of Tanzania</b>.',
        }
    },

    passwordResetMail(email, fullname, code) {
        return mailOptions = {
            from: '"Judiciary Team" <info@judiciary.go.tz>',
            to: email,
            subject: 'Password Reset',
            text: 'Hey there, it mail from Judiciary of Tanzania ',
            html: 'Hello! ' + fullname + '<br><br> Reset your password associated with the e-mail address: ' + email + '.<br><br>Please click the button below to reset your password.<br><br><a href="http://localhost:4200/reset-password/' + code + '" style="background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Reset Password</a><br><br><br><br><b>The Judiciary of Tanzania</b>.',
        }
    }


};