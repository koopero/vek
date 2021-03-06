const _ = require('lodash')

const options = {}

options.parser = function ( keys ) {
  return function ( args ) {
    const result = {}
    const objects = _.map( args, function ( arg ) {
        // See if parsers want to use the value
        // as a primitive.
        for ( var key in keys ) {
          var parser = keys[key]
          if (
            _.isUndefined( result[key] )
            && _.isFunction( parser )
            && _.isFunction( parser.willParse )
            && parser.willParse( arg )
          ) {
            // console.warn('prim parse', key, parser( arg ) )
            result[key] = parser( arg )
            return
          }
        }

        return arg
      } )

    const values = {}
    _.map( objects, function ( ob ) {
      if ( ob )
        _.extend( values, ob )
    })

    // console.warn('options.values', values, objects )

    _.map( keys, function ( parser, key ) {
      if ( key[0] == '#' )
        return

      var value = values[key]
      if ( _.isFunction( parser ) ) {
        value = parser( result[key], value )
      } else if ( _.isUndefined( value ) ) {
        value = parser
      }

      if ( !_.isUndefined( value ) )
        result[key] = value
    } )


    return result;
  }
}

options.int = function ( def ) {
  const cruncher = numberCruncher( parseInt )
  return arguments.length == 0 ? cruncher : cruncher.bind( null, def )
}

options.float = function ( def ) {
  const cruncher = numberCruncher( parseFloat )
  return arguments.length == 0 ? cruncher : cruncher.bind( null, def )
}

function numberCruncher( parseFunc ) {
  return function() {
    for ( var i = arguments.length - 1; i >= 0; i -- ) {
      var arg = parseFunc( arguments[i] )
      if ( !isNaN( arg ) )
        return arg
    }

    return NaN
  }
}

module.exports = options
