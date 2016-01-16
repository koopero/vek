const ass = require('assert')
    , eq = ass.deepEqual

const vert = require('../src/vert')
    , vek = require('../src/vek')

describe('vert', function () {
  describe( 'init from', function () {
    it('veks', function () {
      var v = vert( [ 1,2,3 ], [ 4, 5 ] )
      ass( vek.is( v.pos ) )
      ass( vek.is( v.tex ) )
      ass( v.pos[0] == 1 )
      ass( v.pos[2] == 3 )
      ass( v.tex[1] == 5 )
    })

    it('object', function () {
      var a = vert( { pos: [ 1, 2, 3], tex: { x: 4, y: 5 } } )

      ass( vek.is( a.pos ) )
      ass( vek.is( a.tex ) )
      ass( a.pos[0]  ==  1 )
      ass( a.pos[2]  ==  3 )
      ass( a.tex[1]  ==  5 )
    })


    it('vert', function () {
      var a = vert( [ 1,2,3 ], [ 4, 5 ] )
        , b = vert( a )

        ass( vek.is( b.pos ) )
        ass( vek.is( b.tex ) )

        ass( a.pos !== b.pos )
        ass( a.pos[2] == b.pos[2] )

    })

    // it('object', function () {
    //   var v = vert( { x: 1, y: 2, z: 3, w: 4 } )
    //   eq( v.length, 4 )
    //   eq( v[2], 3 )
    // })
    //
    // it('vert', function () {
    //   var a = vert( 1, 3, 4 )
    //     , b = vert( a )
    //
    //   eq( a.length, b.length )
    //   eq( a[2], b[2] )
    // })
  } )

  describe('.add', function () {
    it('objects', function () {
      var a = vert( [ 1,2,3 ], [ 4, 5 ] )

      a.add( { pos: [ 3,2,1 ] } )

      ass( a.pos[1] == 4 )
    })
  })

  describe('.clone', function () {
    it('clones!', function () {
      var a = vert( [ 1,2,3 ], [ 4, 5 ] )
        , b = a.clone()

      ass( a.pos !== b.pos )
      eq( a.pos[2], b.pos[2] )
    })
  })
})
