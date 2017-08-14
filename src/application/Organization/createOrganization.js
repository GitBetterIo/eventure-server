const UseCase = require('../useCase');

module.exports = ({Organization, organizationRepository}) => UseCase('createOrganization', {
  outputs: ['SUCCESS', 'ERROR'],
  execute: function(orgData) {
    const {SUCCESS, ERROR} = this.outputs;

    let org;
    try {
      org = Organization.create(orgData);
    } catch(err) {
      return this.emit(ERROR, err);
    }

    return organizationRepository.save(org)
      .then(org => this.emit(SUCCESS, org))
      .catch(err => this.emit(ERROR, err))

  }
})
