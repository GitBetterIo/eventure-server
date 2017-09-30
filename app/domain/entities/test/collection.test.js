const {assert} = require('chai')
const CreateCollection = require('../collection')

describe("Entity Collection", () => {
  describe('creating a collection', () => {
    it('Creates an empty collection', () => {
      const col = CreateCollection();
      assert.isOk(col)
      assert.equal(col.length, 0)
    })
    
    it('Creates a collection with an initial list of objects', () => {
      const col = CreateCollection([ {id: 1}, {id: 2}, {id: 3}, ])
      assert.isOk(col)
      assert.equal(col.length, 3)
    })
  })

  describe("updating", () => {
    it("observes changes in collection items", () => {
      const col = CreateCollection([ {id: 1}, {id: 2}, {id: 3}, ])
      const item = col.get(2)
      
      assert.equal(col.getModified().length,0)
      item.prop = 'abc'
      assert.equal(col.getModified().length,1)
      assert.equal(col.getModified()[0].prop, 'abc')


    })
  })

  describe("Get by status", () => {
    it('Gets new items', () => {
      const col = CreateCollection([ {id: 1}, {id: 2, _status: 'NEW'}, {id: 3}, ])
      const newItems = col.getNew();

      assert.equal(newItems.length, 1)
      assert.equal(newItems[0].id, 2)
    })
    
    it('Gets modified items', () => {
      const col = CreateCollection([ {id: 1}, {id: 2, _status: 'NEW'}, {id: 3, _status: 'UPDATED'}, ])
      const newItems = col.getModified();
  
      assert.equal(newItems.length, 2)
    })
  })
})