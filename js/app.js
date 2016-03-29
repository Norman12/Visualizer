const THREE = require("three");
const audio = new Audio('../sounds/kalimba.mp3');
const audioAnalyser = require('web-audio-analyser')(audio);

import {Box} from './Box';

let container, scene, camera, renderer;
let geometry, material, mesh, light, plane;

audioAnalyser.analyser.fftSize = 2048;

init();
animate();

function init() {

  const box = new Box(12,14);
  console.log(box.width);

  container = document.getElementById( 'container' );
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

  render();
  requestAnimationFrame( animate );
}

function render() {
  renderer.render( scene, camera );
}
