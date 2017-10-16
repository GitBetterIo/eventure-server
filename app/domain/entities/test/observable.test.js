const { assert } = require('chai')
const observable = require('../observable')

describe("Observable", () => {
  it("returns a proxy", () => {
    const obj = {a: 1, b: 2}
    const obs = observable(obj)
    
    assert.isOk(obs.__isObservable)
  })
  
  it("registers synchronous change handlers", () => {
    const obj = {a: 1, b: 2}
    const obs = observable(obj)
    let changed = false;

    obs.on("changed", () => {
      changed = true
    })

    assert.isNotOk(changed)
    obs.a = 3
    assert.isOk(changed)
  })

  it("returns objects", () => {
    const nest = {b: 1}
    const obj = {a: nest}
    const obs = observable(obj)

    assert.isOk(obs.a)
  })
  
  it("fires change events on deeply nested objects", () => {
    const obj = { a: { b: { c: 1 } } }
    const obs = observable(obj)
    let changed = false
    obs.on("changed", () => changed = true)
    
    assert.isNotOk(changed)
    obs.a.b.c = 123
    assert.isOk(changed)
  })
  
  it("fires change events on new properties", () => {
    const obj = {a: 1}
    const obs = observable(obj)
    
    let changed = false
    obs.on("changed", () => changed = true)

    assert.isNotOk(changed)
    obs.newProp = 2
    assert.isOk(changed)
  })


  it("observes an array", () => {
    const arr = [1]
    const obs = observable(arr)

    let changed = false
    obs.on("changed", () => changed = true)
  
    assert.isNotOk(changed)
    obs.push(2)
    assert.isOk(changed)
  })
  
  it("observes changes on nested arrays", () => {
    const obj = {a: 1, b: []}
    const obs = observable(obj)
    
    let changed = false
    obs.on("changed", () => changed = true)
  
    assert.isNotOk(changed)
    obs.b.push(1)
    assert.isOk(changed)
  })
})