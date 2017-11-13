const Celebrate = require('celebrate');
const { Joi } = Celebrate;

const Question = Joi.object().keys({
  questionId: Joi.string(),
  answer: Joi.string()
})

const ParticipantId = Joi.string()

module.exports = Celebrate({
  body: Joi.object().keys({
    eventureId: Joi.string().required(),
    listingId: Joi.string().required(),
    groupId: Joi.string().optional().allow(null),

    participantIds: Joi.array().items(ParticipantId).min(1),

    // TODO: only accept 'true'
    acceptTerms: Joi.boolean(), 

    questions: Joi.array().items(Question).min(0),

    payment: Joi.object().keys({ }).optional()
  })
}, {
  abortEarly: false
})