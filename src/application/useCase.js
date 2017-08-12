const EventEmitter = require('events').EventEmitter;
const isFunction = require('lodash/isFunction');
const isArray = require('lodash/isArray');


module.exports = function UseCase(name, {outputs, execute}) {
  if (!isFunction(execute)) {
    throw new Error("'execute' must be a function")
  }

  if (!isArray(outputs)) {
    throw new Error("'outputs' must be an array")
  }

  outputs = createOutputs(outputs);

  function makeUseCase(...args) {

    const useCase = {
      name   : name,
      outputs: outputs,
      emitter: new EventEmitter(),
      args   : args,
      on     : (...onArgs)   => {
        useCase.emitter.on(...onArgs);
        return useCase;
      },
      emit   : (...emitArgs) => useCase.emitter.emit(...emitArgs),
      execute: () => execute.apply(useCase, args),
    }

    return useCase;
  }

  makeUseCase.outputs = outputs;
  return makeUseCase;
}


const createOutputs = (outputsArray) => {
  return outputsArray.reduce((obj, output) => {
    obj[output] = output;
    return obj;
  }, Object.create(null));
};
