const Mailgun = require('mailgun-js');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');

module.exports = ({config}) => {
  const {emailTemplateDir} = config;
  const mailgun = Mailgun(config.mailgun);

  emailDefaults = config.defaults || {};


  function send(data) {
    const emailOptions = Object.assign({}, config.defaults, data);

    return new Promise((resolve, reject) => {
      mailgun.messages().send(emailOptions, function (error, body) {
        if (error) return reject(error);
        return resolve(body);
      });
    });
  }

  function sendTemplate(templateName, emailOptions, data) {
    emailOptions = emailOptions || {};
    const templatePath = path.join(emailTemplateDir, templateName);
    const template = new EmailTemplate(templatePath);

    return template.render(data)
      .then(templateResults => Object.assign({}, emailOptions, templateResults))
      .then(emailData => send(emailData))
  }

  return {send, sendTemplate};

}
