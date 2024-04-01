const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const bootstrap = require('./database/bootstrap');
const EmailRepository = require('./reporistory/email');
sgMail.setApiKey(process.env.SEND_GRID_KEY);
const crypto = require("crypto");
const Logger = require('./logging/logger');
const sendMail = async (to, first_name, user_id, expiry_buffer) => {
    try {
        await bootstrap();
    } catch (error) {
        Logger.error({ message: "DB connection lost", content: error });
        return;
    }

    const token = crypto.randomBytes(37).toString('hex');

    const msg = {
        to: to,
        from: process.env.SEND_GRID_FROM,
        subject: `Thanks for signing up, ${first_name}`,
        templateId: process.env.SEND_GRID_TEMPLATE_ID,
        dynamic_template_data: {
            first_name: first_name,
            link: generateVerificationLink(token),
        }
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        Logger.error({ message: "Mail Sending Failed", content: error });
        return;
    }

    try {
        await EmailRepository.createEmail(user_id, token, msg.dynamic_template_data.link, to, expiry_buffer);
    } catch (error) {
        Logger.error({ message: "Mail Save Failed", content: error });
        return;
    }

    Logger.info({ message: "Mail Sent and Stored successfully", to: to, user_id: user_id });
}

const generateVerificationLink = (token) => {
    const link = `${process.env.DOMAIN_PROTOCOL}://${process.env.DOMAIN_NAME}/v1/user/verify-email/${token}`;
    return link;
}

module.exports = sendMail;