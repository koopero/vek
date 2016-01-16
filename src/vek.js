module.exports = vek

const _ = require('lodash')

vek.NAMES = [
  'x','y','z','w'
]

vek.is = function ( a ) {
  return ( a || false ) && a.__isVek === vek
}

vek.willParse = function ( a ) {
  return Array.isArray( a )
}

function vek() {
  if (
    arguments.length == 1
    && vek.is( arguments[0] )
  )
    return arguments[0]

  const result = []
  parseArray( arguments )
  Object.defineProperty( result, '__isVek', { value: vek } )
  Object.defineProperty( result, 'at', { value: function( ind ) {
    return parseFloat( result[ ind ] ) || 0
  } } )
  return result

  function parseArray( arr ) {
    for ( var i = 0; i < arr.length; i ++ ) {
      var arg = arr[i]
      if ( Array.isArray( arg ) || vek.is( arg ) ) {
        parseArray( arg )
      } else if ( 'object' == typeof( arg ) ) {
        parseObject( arg )
      } else if ( 'number' == typeof( arg ) ){
        result.push( arg )
      }
    }
  }

  function parseObject( ob ) {
    tryKey( 'x', 0 )
    tryKey( 'y', 1 )
    tryKey( 'z', 2 )
    tryKey( 'w', 3 )

    tryKey( 'r', 0 )
    tryKey( 'g', 1 )
    tryKey( 'b', 2 )
    tryKey( 'a', 3 )

    function tryKey( key, index ) {
      var val = parseFloat( ob[key] )
      if ( !isNaN( val ) ) {
        for ( var i = 0; i < index; i ++ ) {
          result[i] = result[i] || 0
        }
        result[index] = val
      }
    }
  }
}

vek.radial = function ( len, angle ) {
  angle = parseFloat( angle ) || 0
  return vek(
    Math.sin( angle ) * len,
    Math.cos( angle ) * len
  )
}

vek.add = function () {
  var result = arguments[0]

  for ( var i = 1; i < arguments.length; i ++ ) {
    var arg = arguments[i]
    result = map(
      function( a,b ) {
        b = parseFloat( b )
        if ( !isNaN( b ) )
          a = (a || 0) + b

        return a
      },
      result,
      vek( arg )
    )
  }


  return result
}

vek.fill = function () {
  var v = vek.apply( null, _.slice( arguments, 0, -1 ) )
    , a = parseInt( _.last( arguments ) ) || 0

  while ( v.length < a ) {
    v.push( 0 )
  }

  return v
}

function map( func ) {
  const args = _.slice( arguments, 1 )
      , length = _.reduce( args, function ( maxLength, arg ) {
        const argLength = parseFloat( arg && arg.length ) || 0
        return Math.max( maxLength, argLength )
      }, 0 )
      , c = []

  // console.warn( 'map.start', length, args )

  for ( var i = 0; i < length; i ++ ) {
    c[i] = func.apply( null, args.map( function ( arg ) {
      return arg && arg[ i ]
    } ) )
  }

  return vek( c )
}
