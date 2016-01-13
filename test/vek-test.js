const ass = require('assert')
    , eq = ass.deepEqual

const vek = require('../src/vek')

describe('vek', function () {
  it('will initialize from arguments', function () {
    var v = vek( 1,2,3,4,5 )
    eq( v.length, 5 )
    eq( v[3], 4 )
  })

  it('will initialize from object', function () {
    var v = vek( { x: 1, y: 2, z: 3, w: 4 } )
    eq( v.length, 4 )
    eq( v[2], 3 )
  })

  describe('.add', function () {
    it('a + b', function () {
      var a = vek( 1, 2, 3 )
        , b = vek( 3, 2, 1 )
        , c = vek.add( a, b )

      eq( c, [ 4, 4, 4 ] )
    })
  })
})
