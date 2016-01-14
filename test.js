const vek = require('./index')
    , yaml = require('js-yaml')


process.stdout.write(
  vek.polygon( {
      scale: 0.01,
      aspect: 4/3,
      sides: 3
    } )
    .export()
)
