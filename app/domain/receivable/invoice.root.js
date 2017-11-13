const schema = require('./invoice.schema')

module.exports = ({}) => {

  const Invoice = {

  }

  const createInvoice = (options) => {
    const valid = schema.validate(options);
    if (valid.error) {
      throw new Error(valid.error)
    }
    
    const invoice = Object.create(Invoice)

    invoice.invoiceDate = options.invoiceDate || new Date();
    invoice.term = options.term;
    invoice.recipientId = options.recipientId


    return invoice
  }
}