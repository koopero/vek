module.exports = mesh

const _ = require('lodash')
    , sprintf = require('sprintf-js').sprintf

function mesh() {
  const self = Object.create( mesh.prototype )
  self.verts = []
  self.edges = []
  self.faces = []

  return self
}

mesh.prototype.vert = function ( vert ) {
  vert.index = this.verts.length
  this.verts.push( vert )
  return this
}

mesh.prototype.edge = function ( p0, p1 ) {
  this.edges.push( [ p0.index, p1.index ] )
  return this
}

mesh.prototype.face = function () {
  this.faces.push( _.map( arguments, function ( vert ) {
    return vert.index
  }))
  return this
}

mesh.prototype.index = function () {

}


mesh.prototype.export = function () {
  const self = this

  var result = ''

  l('ply')
  l('format ascii 1.0')
  l('comment generator: vek@%s', require('../package').version )

  l('element vertex %d', self.verts.length )
  l('element face %d', self.faces.length )
  l('property list uchar int vertex_index' )
  l('element edge %d', self.edges.length )
  l('end_header')

  self.faces.forEach( face )

  return result

  function l() {
    result += sprintf.apply( null, arguments ) + '\n'
  }

  function face( face ) {
    result += face.length + ' '
    result += face.join( ' ' ) + '\n'
  }
}


mesh.prototype.clone = function() {
  return mesh( this )
}


mesh.add = function() {

  options.flatten( arguments ).map( function ( b ) {

  } )
}
