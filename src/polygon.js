module.exports = polygon

const vek = require('./vek')
    , vert = require('./vert')
    , mesh = require('./mesh')
    , options = require('./options')
    , parser = options.parser( {
        centre: vek,
        generator: 'polygon',
        sides: options.int( 6 ),
        radius: options.float( 1 ),
      } )

polygon.options = parser

function polygon() {
  const opt = parser( arguments )

  const s = mesh()
      , sides = opt.sides
      , angle = Math.PI * 2 / sides
      , centre = opt.centre
      , pivot = vert( opt.centre )

  for ( var i = 0; i < sides; i ++ ) {
    var a = angle * i
      , p = vek.add( centre, vek.radial( opt.radius, a ) )
      , v = vert( p )

    s.vert( v )
  }

  for ( var side = 0; side < sides; side ++ ) {
    var next = side == sides - 1 ? 0 : side + 1

    s.edge( s.verts[side], s.verts[next] )
    s.face( s.verts[side], s.verts[next], pivot )
  }

  s.vert( pivot )

  return s
}
