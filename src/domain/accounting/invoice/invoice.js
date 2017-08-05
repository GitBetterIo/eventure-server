const utils = require('../../../lib/utils');

const sumItems = items => items.reduce((sum, item) => sum + item.total, 0);


module.exports.create = function(options) {
  
  const missing = utils.getMissingFields(options, ['clientId']);
  if (missing.length) {
    throw new Error(`Cannot create invoice: Missing the fields [${missing.join(',')}]`);
  }

  const defaults = {
    invoiceDate: new Date(),
    lineItems: [],
  }

  const invoice = Object.assign({}, defaults, options);
  invoice.total = sumItems(invoice.lineItems);

  return invoice;
}


module.exports.addLineItem = function(invoice, options) {
  const newlineItems = invoice.lineItems.concat(createLineItem(options));
  const newTotal = sumItems(newlineItems)

  return Object.assign({}, invoice, {
    lineItems: newlineItems,
    total: newTotal
  })

}


function createLineItem(options) {

  // {
  //   description: '',
  //   quantity: 1,
  //   price: 123,
  //   total: 123,
  // }
  return options;
}
