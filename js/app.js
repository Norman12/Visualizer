const THREE = require("three");

let container, scene, camera, renderer, bouncer;
let geometry, material, mesh, light, plane;

const audio = new Audio('../sounds/kalimba.mp3');
const audioAnalyser = require('web-audio-analyser')(audio);

audioAnalyser.analyser.fftSize = 2048;
audio.addEventListener('canplaythrough', init.bind(this));

init();
animate();

function init() {

  container = document.getElementById( 'container' );
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 82;
  camera.position.x = -28;
  camera.position.y = -28;
  camera.rotation.set(0.7, -0.4, -0.5);

  renderer = new THREE.WebGLRenderer({ antialias: false } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xFBEF2, 1 );

  container.appendChild( renderer.domElement );

  audio.play();

}

function animate() {
  console.log(audioAnalyser.frequencies());

  render();
  requestAnimationFrame( animate );
}

function render() {
  renderer.render( scene, camera );
}
