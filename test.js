const vek = require('./index')
    , yaml = require('js-yaml')


process.stdout.write(
  yaml.safeDump( vek.polygon( {
      scale: 0.01,
      aspect: 4/3,
      sides: 3
    } )
  )
)
