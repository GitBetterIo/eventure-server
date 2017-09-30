const Celebrate = require('celebrate');
const { Joi } = Celebrate;


module.exports = Celebrate({
  body: Joi.object().keys({
      eventureId: Joi.string(),
      name: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date(),
      oneDayEvent: Joi.boolean(),
      basePrice: Joi.number().positive().required(),
    })
      .or('endDate', 'oneDayEvent')
})