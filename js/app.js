const THREE = require("three");
const audio = new Audio('../sounds/kalimba.mp3');
const audioAnalyser = require('web-audio-analyser')(audio);

let container, h, hh, hhh, hhhh, hhhhh, scene, camera, renderer;
let geometry, material, mesh, light, plane;

audioAnalyser.analyser.fftSize = 2048;

init();
animate();

function init() {

  container = document.getElementById( 'container' );
  h = document.getElementById( 'h' );
  hh = document.getElementById( 'hh' );
  hhh = document.getElementById( 'hhh' );
  hhhh = document.getElementById( 'hhhh' );
  hhhhh = document.getElementById( 'hhhhh' );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer({ antialias: false } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xFDDAD, 1 );

  container.appendChild( renderer.domElement );

  audio.play();

}

function animate() {
  //console.log(audioAnalyser.frequencies());

  //h.innerHTML = audioAnalyser.frequencies()[512];
  let ht = '[204]: ',
      hht = '[408]: ',
      hhht = '[612]: ',
      hhhht = '[816]: ',
      hhhhht = '[912]: ';

  console.log(hhht);
  const hn = Math.round(audioAnalyser.frequencies()[204]/16);
  const hhn = Math.round(audioAnalyser.frequencies()[408]/16);
  const hhhn = Math.round(audioAnalyser.frequencies()[612]/16);
  const hhhhn = Math.round(audioAnalyser.frequencies()[816]/16);
  const hhhhhn = Math.round(audioAnalyser.frequencies()[912]/16);
  for(var i = 0; i < hn; i++){
    ht += '/ ';
  }
  for(var i = 0; i < hhn; i++){
    hht += '/ ';
  }
  for(var i = 0; i < hhhn; i++){
    hhht += '/ ';
  }
  for(var i = 0; i < hhhhn; i++){
    hhhht += '/ ';
  }
  for(var i = 0; i < hhhhhn; i++){
    hhhhht += '/ ';
  }
  h.innerHTML = ht;
  hh.innerHTML = hht;
  hhh.innerHTML = hhht;
  hhhh.innerHTML = hhhht;
  hhhhh.innerHTML = hhhhht;

  render();
  requestAnimationFrame( animate );
}

function render() {
  renderer.render( scene, camera );
}
