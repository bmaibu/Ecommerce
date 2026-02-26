import nodemailer from 'nodemailer'
import 'dotenv/config'

export const verifyEmail = (token, email) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 2525,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfigurations = {

        from: "bmaibu213@gmail.com",

        to: email,
        subject: 'Email Verification',

        text: `Hi! There, You have recently visited 
               our website and entered your email.
               Please follow the given link to verify your email
               ${process.env.FRONTEND_URL}/verify/${token} 
               Thanks`
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) return console.log(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });
}