const UseCase = require('../useCase');

module.exports = ({organizationReadService}) => UseCase('listOrganizations', {
  outputs: ['SUCCESS', 'ERROR'],
  execute: function(options) {
    options = options || {};
    const {SUCCESS, ERROR} = this.outputs;
    organizationReadService.find({}, options)
      .then(orgs => this.emit(SUCCESS, orgs))
      .catch(err => this.emit(ERROR, orgs))
  }
})
