module.exports = mesh
function mesh() {
  const self = Object.create( mesh.prototype )
  self.verts = []
  self.edges = []
  self.faces = []

  return self
}

mesh.prototype.vert = function ( vert ) {
  this.verts.push( vert )
  return this
}

mesh.prototype.edge = function ( p0, p1 ) {
  this.edges.push( [ p0, p1 ] )
  return this
}

mesh.prototype.face = function () {
  this.faces.push( Array.prototype.slice.apply( arguments ) )
  return this
}

mesh.prototype.index = function () {

}

mesh.prototype.clone = function() {
  return mesh( this )
}


mesh.add = function() {

  options.flatten( arguments ).map( function ( b ) {
    
  } )
}
