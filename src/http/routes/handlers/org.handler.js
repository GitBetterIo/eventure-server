

module.exports = ({application}) => ({
  list: (req, res, next) => {
    console.log("HERE")
    const options = {};
    const {SUCCESS, ERROR} = application.organizationService.listOrganizations.outputs;
    application.organizationService.listOrganizations(options)
      .on(SUCCESS, orgs => res.json(orgs))
      .on(ERROR, err => {
        console.log("ERR", err)
        next(err)
      })
      .execute();
  }
})
