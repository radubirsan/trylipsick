/**
 * BRFv5 - Coloring Libs
 *
 * This example fills all triangles of a certain part of the face (here the lips) with
 * a given color and alpha.
 *
 * see: utils__face_triangles.js includes the mouth triangles for the
 * complete mouth or only the libs.
 *
 * Works only with a 68l model.
 */
 import { getColor } 						from '../utils/utils__canvas.js'
import { drawTexture }                      from '../utils/utils__canvas.js'
import { faceTrianglesWithMouthWhole68l }   from '../utils/utils__face_triangles.js'
import { faceExtendedTriangles74l }   		from '../utils/utils__face_triangles.js'
import { faceExtendedTrianglesWithMouthWhole74l } from '../utils/utils__face_triangles.js'

import { setupExample }                     from './setup__example.js'
import { trackCamera, trackImage }          from './setup__example.js'

import { drawCircles }                      from '../utils/utils__canvas.js'
import { drawFillTriangles }                from '../utils/utils__canvas.js'
import { drawFaceDetectionResults }         from '../utils/utils__draw_tracking_results.js'

import { libTriangles, mouthTriangles }     from '../utils/utils__face_triangles.js'
import { colorWhitePale, colorOrange }      from '../utils/utils__colors.js'

import { brfv5 }                            from '../brfv5/brfv5__init.js'

import { configureNumFacesToTrack }         from '../brfv5/brfv5__configure.js'
import { setROIsWholeImage }                from '../brfv5/brfv5__configure.js'


let numFacesToTrack = 1 // set be run()




	
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const configureExample = (brfv5Config) => {

  configureNumFacesToTrack(brfv5Config, numFacesToTrack)
 console.log("configureExample");
 document.getElementById("CameraAccess").style.display = "none"
  if(numFacesToTrack > 1) {

    //setROIsWholeImage(brfv5Config)
  }
	
 
}
let clicked = true;
export const handleTrackingResults = (brfv5Manager, brfv5Config, canvas) => {
 const ctx2   = document.getElementById("myCanvas").getContext('2d')
  if(clicked) {
	  
	  clicked = false;
	  console.log("ADDED");
	  document.body.addEventListener('click', function(){
			//colorVar = getRandomColor();
			//alert(colorVar);
			console.log(colorVar);
	}, true); 
	  
	  
  }
	
  const ctx   = canvas.getContext('2d')
 
  const faces = brfv5Manager.getFaces()

  let doDrawFaceDetection = false

  for(let i = 0; i < faces.length; i++) {

    const face = faces[i]

    if(face.state === brfv5.BRFv5State.FACE_TRACKING) {

      //drawCircles(ctx, face.landmarks, colorWhitePale, 1)
      drawFillTriangles(ctx, face.vertices, libTriangles, colorVar, lipColorAlpha);
	if(isMobile) return;
var vertices = face.vertices
var triangles = faceExtendedTriangles74l;
ctx2.clearRect(0, 0, canvas.width, canvas.height);
ctx2.strokeStyle           = getColor(colorVar, 0.0)
  ctx2.fillStyle             = getColor(colorVar, 0.0)
  ctx2.lineWidth             = 0.0
 ctx2.save();
   ctx2.beginPath()
for(let i = 0; i < triangles.length; i += 3) {

    const ti0 = triangles[i]
    const ti1 = triangles[i + 1]
    const ti2 = triangles[i + 2]

    const x0 = vertices[ti0 * 2]
    const y0 = vertices[ti0 * 2 + 1]
    const x1 = vertices[ti1 * 2]
    const y1 = vertices[ti1 * 2 + 1]
    const x2 = vertices[ti2 * 2]
    const y2 = vertices[ti2 * 2 + 1]

    ctx2.moveTo(x0, y0)
    ctx2.lineTo(x1, y1)
    ctx2.lineTo(x2, y2)
    ctx2.lineTo(x0, y0)

    ctx2.fill()
    //ctx2.stroke()
  }
ctx2.closePath();
ctx2.clip();
 ctx2.drawImage(canvas,0,0);
 
 ctx2.restore()

  //ctx2.fill()
 
 
 
   

      // set line color

    } else {

      doDrawFaceDetection = true
    }
  }



  if(doDrawFaceDetection) {

    drawFaceDetectionResults(brfv5Manager, brfv5Config, canvas)
  }

  return false
}



const exampleConfig = {

  onConfigure:              configureExample,
  onTracking:               handleTrackingResults
}

// run() will be called automatically after 1 second, if run isn't called immediately after the script was loaded.
// Exporting it allows re-running the configuration from within other scripts.

let timeoutId = -1

export const run = (_numFacesToTrack = 1) => {

  numFacesToTrack = _numFacesToTrack

  clearTimeout(timeoutId)
  setupExample(exampleConfig)

  if(window.selectedSetup === 'image') {

    trackImage('./assets/tracking/' + window.selectedImage)

  } else {

    trackCamera()
  }
}

timeoutId = setTimeout(() => { run() }, 1000)

export default { run }
