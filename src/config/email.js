const path = require('path');

module.exports = {
  emailTemplateDir: path.resolve(__dirname, '..', 'templates', 'email'),
  mailgun: {
    apiKey: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
  },
}
