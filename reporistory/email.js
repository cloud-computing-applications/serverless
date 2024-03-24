const moment = require('moment');
const DB = require('../database/db');

class EmailRepository {
    static async createEmail(user_id, token, link, to, expiry_buffer) {
        let emailObject = {
            user_id: user_id,
            token: token,
            link: link,
            to: to,
            expiry_date: moment().add(expiry_buffer, 'seconds')
        };
        const email = await DB.models.emails.create(emailObject);
        return email;
    }
}

module.exports = EmailRepository;