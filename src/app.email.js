import NodeMailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { config } from 'dotenv';
import * as fs from 'fs';

config()

const transporter = NodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const create_mail_option = (email, subject, html) => {
    return {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: html
    }
}

export const send_email = (email, subject, html_template_url, data_template) => {
    let html_source = fs.readFileSync(html_template_url, 'utf-8').toString();
    let html_template = handlebars.compile(html_source);
    let html_to_send = html_template(data_template);
    let mail_options = create_mail_option(email, subject, html_to_send);
    transporter.sendMail(mail_options, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response)
        }
        transporter.close();
    });
}