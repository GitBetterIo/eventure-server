

module.exports = {
  list: async (req, res, next) => {
    const query = {};
    const options = {};
    const {organizationService} = req.container.cradle

    try {
      const orgs = await organizationService.listOrganizations(query, options);
      return res.json(orgs);
    } catch(err) {
      return next(err);
    }
  },

  create: async (req, res, next) => {
    const orgData = req.body;
    const {organizationService} = req.container.cradle

    try {
      const org = await organizationService.createOrganization(orgData);
      return res.status(201).json(org);
    } catch(err) {
      return next(err);
    }
  },
  get: async (req, res, next) => {
    const {orgId} = req.params;
    const {organizationService} = req.container.cradle

    try {
      const org = await organizationService.getOrganization(orgId);
      if (!org) {
        const err = new Error(`Organization not found`);
        err.status = 404;
        return next(err);
      }
      return res.json(org);
    } catch(err) {
      return next(err);
    }
  },

  update: async (req, res, next) => {
    const {orgId} = req.params;
    const orgData = req.body;
    const {organizationService} = req.container.cradle

    try {
      const org = await organizationService.updateOrganization(orgId, orgData);
      if (!org) {
        const err = new Error(`Organization not found`);
        err.status = 404;
        return next(err);
      }
      return res.json(org);
    } catch(err) {
      return next(err);
    }
  },

  remove: async (req, res, next) => {
    const {orgId} = req.params;
    const {organizationService} = req.container.cradle

    try {
      await organizationService.removeOrganization(orgId);
      return res.json({deleted: orgId})
    } catch(err) {
      return next(err);
    }
  },
}
