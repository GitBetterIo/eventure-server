const Joi = require('joi')

const InvoiceOptionsSchema = Joi.Object().keys({
  invoiceDate: Joi.date(),
})


module.exports  = {
  schema: InvoiceOptionsSchema,
  validate: data => {
    return Joi.validate(data, InvoiceOptionsSchema)
  }
}