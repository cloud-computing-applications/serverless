const functions = require('@google-cloud/functions-framework');
const sendMail = require('./mailer');
const Logger = require('./logging/logger');

functions.cloudEvent('sendVerificationMail', cloudEvent => {
  const base64name = cloudEvent.data.message.data;

  const stringifiedData = base64name ? Buffer.from(base64name, 'base64').toString() : '{}';
  let data;

  try {
    data = JSON.parse(stringifiedData);
  } catch (error) {
    Logger.error({ message: "Invalid JSON", content: stringifiedData });
    return;
  }

  if(!data.user_id || !data.username || !data.first_name || !data.expiry_buffer) {
    Logger.error({ message: "Missing Data", content: data });
    return;
  }

  sendMail(data.username, data.first_name, data.user_id, data.expiry_buffer);
});