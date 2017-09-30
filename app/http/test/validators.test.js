const { assert } = require('chai')
const uuid = require('uuid/v4')

const validateCreateListing = require('../routes/handlers/eventure/validateCreateListing')

const validate = (validator, data) => new Promise((resolve, reject) => {
  const req = {
    method: 'POST',
    body: data,
  }
  const res = {}
  const next = (err) => (err) ? reject(err) : resolve(req);

  validator(req, res, next)
})

describe("HTTP Validators", () => {
  describe("Listing Validators", () => {

    describe("Create Listing", () => {

      it("passes a valid input", async () => {
        const listData = {
          eventureId: uuid(),
          name: 'tester',
          startDate: new Date(),
          endDate: new Date(),
          basePrice: 12,
        }

        try {
          const req = await validate(validateCreateListing, listData)
          // console.log("SUCCESS", req)
        } catch (err) {
          console.log(err.details)
          assert(false, err.message)
        }
        

      })
    })
  })
})