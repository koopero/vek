const vek = require('./index')
    , yaml = require('js-yaml')


var a = vek.polygon( {
  pos: [ 0, -8 ],
  scale: 0.01,
  aspect: 3/4,
  sides: 8
} )

var b = a.clone()
b.translate( {
  pos: [ 2,1.3 ]
} )

var a = vek.mesh.add( a, b )
// var mesh = poly



process.stdout.write(
  a.export()
)
