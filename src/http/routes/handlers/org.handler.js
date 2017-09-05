

module.exports = ({application}) => ({
  list: async (req, res, next) => {
    const query = {};
    const options = {};

    try {
      const orgs = await application.organizationService.listOrganizations(query, options);
      return res.json(orgs);
    } catch(err) {
      return next(err);
    }
  },

  create: async (req, res, next) => {
    const orgData = req.body;

    try {
      const org = await application.organizationService.createOrganization(orgData);
      return res.status(201).json(org);
    } catch(err) {
      return next(err);
    }
  },
  get: async (req, res, next) => {
    const {orgId} = req.params;

    try {
      const org = await application.organizationService.getOrganization(orgId);
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

  update: (req, res, next) => {
    const {orgId} = req.params;
    const orgData = req.body;

    try {
      const org = await application.organizationService.updateOrganization(orgId, orgData);
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

  remove: (req, res, next) => {
    const {orgId} = req.params;

    try {
      await application.organizationService.removeOrganization(orgId);
      return res.json({deleted: orgId})
    } catch(err) {
      return next(err);
    }
  },
})
