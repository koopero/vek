module.exports = mesh

const _ = require('lodash')
    , sprintf = require('sprintf-js').sprintf

const vek = require('./vek')
    , vert = require('./vert')

mesh.is = function ( m ) {
  return m instanceof mesh
}

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

mesh.prototype.export = function () {
  const self = this
      , format =
        {
          'vert': {
            'pos': {
              keys: [ 'x','y','z' ],
            },
            'tex': {
              keys: [ 'u', 'v' ]
            }
          }
        }

  var result = ''

  l('ply')
  l('format ascii 1.0')
  l('comment generator: vek@%s', require('../package').version )

  l('element vertex %d', self.verts.length )
  vertFormat()
  l('element face %d', self.faces.length )
  l('property list uchar int vertex_index' )
  l('element edge %d', self.faces.length )
  l('property int vertex0' )
  l('property int vertex1' )
  l('end_header')
  self.verts.forEach( vert )
  self.faces.forEach( face )
  self.edges.forEach( face )

  return result

  function l() {
    result += sprintf.apply( null, arguments ) + '\n'
  }

  function vertFormat() {
    _.map( format.vert, function ( vertField, key ) {
      var val = vert[ key ]
      _.map( vertField.keys, function ( key, i ) {
        l('property float '+key )
      } )
    } )
  }

  function vert( vert ) {
    var c = []
    _.map( format.vert, function ( vertField, key ) {
      var v = vek( vert[ key ] )
      _.map( vertField.keys, function ( key, i ) {
        c.push( v.at( i ) )
      } )
    } )

    c = c.map( formatNumber )

    l( c.join(' ') )
  }

  function face( face ) {
    result += face.length + ' '
    result += face.join( ' ' ) + '\n'
  }

  function formatNumber( num ) {
    num = num || 0
    return num.toFixed( 6 )
  }
}

mesh.prototype.append = function() {
  const self = this

  _.map( arguments, function ( b ) {
    var offset = self.verts.length

    if ( mesh.is( b ) ) {
      self.verts = self.verts.concat( b.verts.map( eachVert ) )
      self.edges = self.edges.concat( b.edges.map( eachIndexes ) )
      self.faces = self.faces.concat( b.faces.map( eachIndexes ) )

      function eachVert( v ) {
        v = v.clone()
        v.index += offset
        return v
      }

      function eachIndexes( arr ) {
        return arr.map( function ( ind ) {
          return ind + offset
        })
      }
    }
  })
}

mesh.prototype.clone = function() {
  var m = mesh()
  m.append( this )
  return m
}

mesh.prototype.translate = function () {
  const self = this
  var verts = self.verts

  _.map( arguments, function ( arg )  {
    var b = vert( arg )
    verts = verts.map( function ( a ) {
      return vert.add( a, b )
    } )
  } )

  self.verts = verts
}


mesh.add = function() {
  var m

  _.map( arguments, function ( b ) {
    if ( !m )
      m = b.clone()
    else
      m.append( b )
  } )

  return m
}
