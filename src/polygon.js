module.exports = polygon

const vek = require('./vek')
    , vert = require('./vert')
    , mesh = require('./mesh')
    , options = require('./options')
    , parser = options.parser( {
        pos: vek,
        rad: options.float( 1 ),
        gen: 'polygon',
        sides: options.int( 6 ),
      } )

polygon.options = parser

function polygon() {
  const opt = parser( arguments )

  const s = mesh()
      , sides = opt.sides
      , angle = Math.PI * 2 / sides
      , centre = opt.centre
      , pivot = vert( opt.centre )

  s.vert( pivot )

  for ( var i = 0; i < sides; i ++ ) {
    var a = angle * i
      , pos = vek.add( centre, vek.radial( opt.rad, a ) )
      , tex = vek.add( [ 0.5, 0.5 ], vek.radial( 0.5, a ) )
      , v = vert( pos, tex )

    s.vert( v )
  }

  for ( var side = 1; side <= sides; side ++ ) {
    var next = ( side == sides ? 1 : side + 1 )

    s.edge( s.verts[side], s.verts[next] )
    s.face( s.verts[side], s.verts[next], pivot )
  }

  return s
}
