

module.exports = ({application}) => ({
  list: (req, res, next) => {
    const options = {};
    const {SUCCESS, ERROR} = application.organizationService.listOrganizations.outputs;
    application.organizationService.listOrganizations(options)
      .on(SUCCESS, orgs => res.json(orgs))
      .on(ERROR, err => next(err))
      .execute();
  },

  create: (req, res, next) => {
    const orgData = req.body;
    const {SUCCESS, ERROR} = application.organizationService.createOrganization.outputs;
    application.organizationService.createOrganization(orgData)
      .on(SUCCESS, org => res.status(201).json(org))
      .on(ERROR, err => next(err))
      .execute();

  },
  get: (req, res, next) => {
    const {orgId} = req.params;
    const {SUCCESS, NOTFOUND, ERROR} = application.organizationService.createOrganization.outputs;
    application.organizationService.getOrganization(orgId)
      .on(SUCCESS, org => res.json(org))
      .on(ERROR, err => next(err))
      .on(NOTFOUND, orgId => {
        const err = new Error(`Could not find organization ${orgId}`);
        err.status = 404;
        next(err);
      })
      .execute();
  },

  update: (req, res, next) => {
    const {orgId} = req.params;
    const orgData = req.body;
    const {SUCCESS, NOTFOUND, ERROR} = application.organizationService.updateOrganization.outputs;

    application.organizationService.updateOrganization(orgId, orgData)
      .on(SUCCESS, org => res.json(org))
      .on(ERROR, err => next(err))
      .on(NOTFOUND, orgId => {
        const err = new Error(`Could not find organization ${orgId}`);
        err.status = 404;
        next(err);
      })
      .execute();
  },

  remove: (req, res, next) => {
    const {orgId} = req.params;
    const {SUCCESS, NOTFOUND, ERROR} = application.organizationService.removeOrganization.outputs;

    application.organizationService.removeOrganization(orgId)
      .on(SUCCESS, org => res.json({deleted: orgId}))
      .on(ERROR, err => next(err))
      .on(NOTFOUND, orgId => {
        const err = new Error(`Could not find organization ${orgId}`);
        err.status = 404;
        next(err);
      })
      .execute();
  },
})
