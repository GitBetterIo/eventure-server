

module.exports = () => {

  const Organization = {
    /**
     * Changes the name of the organization
     * @param {String} name 
     */
    changeName(name) {
      this.name = name;
    },
  }

  const orgPrototype = Object.assign({}, Organization)

  const createOrganization = (orgData) => {
    if (!orgData.name) throw new Error('Missing organization name');
    
    const org = Object.create(orgPrototype)

    return Object.assign(org, orgData)
  }
}