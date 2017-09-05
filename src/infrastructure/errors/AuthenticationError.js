const isObject = require('lodash/isObject')


class AuthenticationError extends Error {
  constructor(message) {
    let stack;
    if (isObject(message)) {
      stack = message.stack;
      message = message.message;
    }
    super(message);
    this.name = this.constructor.name;
    this.status = 401;

    if (stack) {
      this.stack = stack
    }
  }
}

module.exports = AuthenticationError;
