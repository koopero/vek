module.exports = vert

const vek = require('./vek')
    , options = require('./options')
    , parser = options.parser( {
        pos: vek,
      } )

function vert( p ) {
  return parser( arguments )
}
