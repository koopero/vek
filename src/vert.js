module.exports = vert

const _ = require('lodash')

const vek = require('./vek')
    , options = require('./options')
    , parser = options.parser( {
        pos: vek,
        tex: vek
      } )

function vert( p ) {
  const v = Object.create( vert.prototype )
      , args = parser( arguments )

  // console.warn( 'vert()', v, args, arguments )
  _.extend( v, args )

  // console.warn( 'vert()=', v )

  return v
}

vert.prototype.add = function () {
  var a = this
  _.map( arguments, function ( b ) {
    // console.warn( 'vert+', b )
    _.map( b, function ( bVal, key) {
      var aVal = a[key]

      if ( _.isUndefined( aVal ) ) {
        aVal = bVal
      } else if ( vek.is( aVal ) || vek.is( bVal ) ) {
        aVal = vek.add( aVal, bVal )
      } else if ( _.isNumber( aVal ) || _.isNumber( bVal ) ) {
        aVal = ( parseFloat( aVal ) || 0 ) + parseFloat( bVal ) || 0
      }

      a[key] = aVal
    })
  })

  return a
}

vert.prototype.clone = function () {
  return vert( this )
}

vert.add = function () {
  var a

  _.map( arguments, function ( arg ) {
    if ( !a )
      a = vert( arg )
    else
      a.add( vert( arg ) )
  })

  return a
}
