const Celebrate = require('celebrate');
const { Joi } = Celebrate;

const fee = Joi.object().keys({
  feeDate: Joi.string().regex(/^\d{4}\-\d{1,2}\-\d{1,2}/),
  fee: Joi.number(),
  close: Joi.boolean()
})

var services = Joi.array().items(service);


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
}, {abortEarly: false, allowUnknown: true})