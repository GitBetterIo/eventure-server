const path = require('path');

module.exports = {
  emailTemplateDir: path.resolve(__dirname, '..', 'templates', 'email'),
  defaults: {
    from: 'Aaron <aaron@topshelfrobot.com>',
    subject: 'An email for you',
  },
  mailgun: {
    apiKey: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
  },
}
