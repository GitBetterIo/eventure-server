const UseCase = require('../useCase');

module.exports = ({organizationRepository}) => UseCase('removeOrganization', {
  outputs: ['SUCCESS', 'NOTFOUND', 'ERROR'],
  execute: function(orgId) {
    const {SUCCESS, NOTFOUND, ERROR} = this.outputs;

    return organizationRepository.find({id: orgId}, {limit: 1})
      .then(org => {
        if (!org) return this.emit(NOTFOUND, {organizationId: orgId});
        const doomedOrg = Object.assign({}, org, {deleted: true, modified: new Date()});
        return organizationRepository.save(doomedOrg);
      })
      .then(org => this.emit(SUCCESS, org))
      .catch(err => this.emit(ERROR, err));
  }
});
