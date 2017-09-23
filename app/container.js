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
  const infrastructureTypes = ['service', 'dataStore', 'repository', 'read.service'].join('|');
  const domainTypes = ['entity', 'root'].join('|')

  container.registerValue({
    config,
    errors: require('./infrastructure/errors'),
    helpers: require('./helpers'),
  });

  container.registerFunction({passport: require('./http/passport')})
  container.loadModules([ 
    `infrastructure/**/*.+(${infrastructureTypes}).js`,
    `domain/**/*.+(${domainTypes}).js`,
  ], {
    formatName: 'camelCase',
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