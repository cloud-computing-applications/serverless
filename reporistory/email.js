const moment = require('moment');
const DB = require('../database/db');

class EmailRepository {
    static async createEmail(user_id, link, to, expiry_buffer) {
        let emailObject = {
            token: user_id,
            link: link,
            to: to,
            expiry_date: moment().add(expiry_buffer, 'seconds')
        };
        const email = await DB.models.emails.create(emailObject);
        return email;
    }
}

module.exports = EmailRepository;