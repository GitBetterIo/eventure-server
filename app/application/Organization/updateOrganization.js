const UseCase = require('../useCase');

module.exports = ({organizationRepository}) => UseCase('updateOrganization', {
  outputs: ['SUCCESS', 'NOTFOUND', 'ERROR'],
  execute: function(orgId, orgData) {
    const {SUCCESS, NOTFOUND, ERROR} = this.outputs;

    return organizationRepository.find({id: orgId}, {limit: 1})
      .then(org => {
        if (!org) return this.emit(NOTFOUND, {organizationId: orgId});
        const updatedOrg = Object.assign({}, org, orgData, {modified: new Date()});
        return organizationRepository.save(updatedOrg);
      })
      .then(org => this.emit(SUCCESS, org))
      .catch(err => this.emit(ERROR, err));
  }
});
