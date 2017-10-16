const Celebrate = require('celebrate');
const { Joi } = Celebrate;


module.exports = Celebrate({
  body: Joi.object().keys({
      eventureId: Joi.string(),
      name: Joi.string().required(),
      description: Joi.string().allow(''),
      startDate: Joi.date().required(),
      endDate: Joi.date(),
      oneDayEvent: Joi.boolean(),
      registrationOpenDate: Joi.date().default(Date.now, 'Default registration open date'),
      registrationCloseDate: Joi.date(),
      price: Joi.number().min(0).required(),
    })
      .or('endDate', 'oneDayEvent')
}, {abortEarly: false})