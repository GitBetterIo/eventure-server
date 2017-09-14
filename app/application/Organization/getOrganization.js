const UseCase = require('../useCase');

module.exports = ({organizationReadService}) => UseCase('getOrganization', {
  outputs: ['SUCCESS', 'ERROR'],
  execute: function(organizationId) {
    const {SUCCESS, NOTFOUND, ERROR} = this.outputs;
    return organizationReadService.findById(organizationId)
      .then(org => {
        if (!org) return this.emit(NOTFOUND, {organizationId});
        return this.emit(SUCCESS, org);
      })
      .catch(err => this.emit(ERROR, err));
  }
})
