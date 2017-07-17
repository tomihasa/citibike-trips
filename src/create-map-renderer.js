const glslify = require('glslify')

module.exports = function createMapRenderer (regl, lines) {
  const lineSegments = []
  for (let line of lines) {
    for (let j = 0; j < line.length - 1; j++) {
      lineSegments.push(line[j])
      lineSegments.push(line[j + 1])
    }
  }

  const renderMap = regl({
    vert: glslify.file('./map.vert'),
    frag: glslify.file('./map.frag'),
    attributes: {
      position: lineSegments
    },
    count: lineSegments.length,
    uniforms: {
      color: [0.75, 0.75, 0.75]
    },
    primitive: 'lines',
    blend: {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 1,
        dstRGB: 'one minus src alpha',
        dstAlpha: 1
      },
      equation: {
        rgb: 'add',
        alpha: 'add'
      }
    }
  })

  return renderMap
}