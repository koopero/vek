module.exports = vek

vek.is = function ( a ) {
  return a && a.__isVek === vek
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
  return result

  function parseArray( arr ) {
    for ( var i = 0; i < arr.length; i ++ ) {
      var arg = arr[i]
      if ( Array.isArray( arg ) ) {
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
    result = mapDouble( result, vek( arguments[i] ), function( a,b ) {
      if ( !isNaN( b ) )
        a = a || 0 +  b

      return a
    } )
  }

  return result
}

function mapDouble( a, b, func ) {
  var c = []
  for ( var i = 0; i < a.length || i < b.length; i ++ ) {
    c[i] = func( a[i], b[i], i )
  }

  return vek( c )
}
