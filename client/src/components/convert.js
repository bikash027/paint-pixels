// export default function hsvToRgb(h, s, v){
//     var r, g, b;

//     var i = Math.floor(h * 6);
//     var f = h * 6 - i;
//     var p = v * (1 - s);
//     var q = v * (1 - f * s);
//     var t = v * (1 - (1 - f) * s);

//     switch(i % 6){
//         case 0: r = v; g = t; b = p; break;
//         case 1: r = q; g = v; b = p; break;
//         case 2: r = p; g = v; b = t; break;
//         case 3: r = p; g = q; b = v; break;
//         case 4: r = t; g = p; b = v; break;
//         case 5: r = v; g = p; b = q; break;
//     }

//     // return [r * 255, g * 255, b * 255];
//     return 'rgb('+r*255+','+g*255+','+b*255+')' ;
// }

const RGB_MAX = 255
const HUE_MAX = 360
const SV_MAX = 100

function _normalizeAngle (degrees) {
  return (degrees % 360 + 360) % 360;
}


export default  function hsv2rgb(h, s, v) {
  if (typeof h === 'object') {
    const args = h
    h = args.h; s = args.s; v = args.v;
  }

  h = _normalizeAngle(h)
  h = (h === HUE_MAX) ? 1 : (h % HUE_MAX / parseFloat(HUE_MAX) * 6)
  s = (s === SV_MAX) ? 1 : (s % SV_MAX / parseFloat(SV_MAX))
  v = (v === SV_MAX) ? 1 : (v % SV_MAX / parseFloat(SV_MAX))

  var i = Math.floor(h)
  var f = h - i
  var p = v * (1 - s)
  var q = v * (1 - f * s)
  var t = v * (1 - (1 - f) * s)
  var mod = i % 6
  var r = [v, q, p, p, t, v][mod]
  var g = [t, v, v, q, p, p][mod]
  var b = [p, p, t, v, v, q][mod]

  const cob= {
    r: Math.floor(r * RGB_MAX),
    g: Math.floor(g * RGB_MAX),
    b: Math.floor(b * RGB_MAX),
  }
  return 'rgb('+(cob.r)+','+(cob.g)+','+(cob.b)+')' ;
}

// colorsys.hsv_to_rgb = colorsys.hsv2Rgb
// colorsys.hsvToRgb = colorsys.hsv2Rgb

// colorsys.rgb2Hex = function (r, g, b) {
//   if (typeof r === 'object') {
//     const args = r
//     r = args.r; g = args.g; b = args.b;
//   }
//   r = Math.round(r).toString(16)
//   g = Math.round(g).toString(16)
//   b = Math.round(b).toString(16)

//   r = r.length === 1 ? '0' + r : r
//   g = g.length === 1 ? '0' + g : g
//   b = b.length === 1 ? '0' + b : b

//   return '#' + r + g + b
// }