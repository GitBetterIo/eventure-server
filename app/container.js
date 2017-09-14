const awilix = require('awilix')


const entityFormat = (name, descriptor) => {
  const splat = descriptor.path.split('/')
  const entity = splat[splat.length - 2]
  return entity.charAt(0).toLowerCase() + entity.substring(1) + 'Entity';
}
const indexedServiceFormat = (name, descriptor) => {
  const splat = descriptor.path.split('/')
  const entity = splat[splat.length - 2]
  return entity.charAt(0).toLowerCase() + entity.substring(1) + 'Service';
}

module.exports = ({config}) => {
  const container = awilix.createContainer()
  const types = ['service', 'dataStore', 'entity', 'repository', 'read.service'].join('|');

  container.registerValue({
    config,
    errors: require('./infrastructure/errors'),
  });

  container.registerFunction({passport: require('./http/passport')})
  container.loadModules([ 
    `infrastructure/**/*.+(${types}).js`,
  ], {
    formatName: 'camelCase',
    cwd: __dirname,
    registrationOptions: {
      lifetime: awilix.Lifetime.SCOPED
    }
  })
  container.loadModules([
    `domain/entities/**/index.js`,
  ], {
    formatName: entityFormat,
    cwd: __dirname,
    registrationOptions: {
      lifetime: awilix.Lifetime.SCOPED
    }
  })
  container.loadModules([
    `application/**/index.js`,
  ], {
    formatName: indexedServiceFormat,
    cwd: __dirname,
    registrationOptions: {
      lifetime: awilix.Lifetime.SCOPED
    }
  })



  
  // console.log(Object.keys(container.registrations))

  return container;

}