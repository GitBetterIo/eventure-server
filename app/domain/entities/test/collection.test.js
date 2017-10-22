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
    
    it('converts each item to an observable', () => {
      const col = CreateCollection([ {id: 1}, {id: 2}, {id: 3}, ])
      col.forEach(c => assert.isOk(c.__isObservable))

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
    
    it("observes changes in nested collection Items", () => {
      const col = CreateCollection([
        {id: 1, a: {b: 111, c: 222}},
        {id: 2, a: {b: 333, c: 444}},
      ])
      
      const item = col.get(1)

      assert.equal(col.getModified().length,0)
      item.a.b = 555
      assert.equal(col.getModified().length,1)
      assert.equal(col.getModified()[0].a.b, 555)
    })

    it("observes changes in deeply nested collection Items", () => {
      const col = CreateCollection([
        {id: 1, a: {b: [1,2,3], c: 222}},
        {id: 2, a: {b: [1,2,3], c: 444}},
      ])
      
      const item = col.get(1)

      assert.equal(col.getModified().length,0)
      item.a.b.push(4)
      assert.equal(col.getModified().length,1)
      assert.deepEqual(col.getModified()[0].a.b, [1,2,3,4])
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

  describe("Adding to the collection", () => {
    it('Preserves the prototype chain on add', () => {
      const proto = { a: 123 }
      const obj = Object.assign(
        Object.create(proto),
        {id: 1, b: 456}
      )
      const col = CreateCollection();

      assert.equal(obj.a, 123)
      col.add(obj)
      const colObj = col.get(1)
      assert.equal(obj.a, 123)
      assert.equal(colObj.id, 1)
      assert.equal(colObj.b, 456)
      assert.equal(colObj.a, 123)
    })
  })
})