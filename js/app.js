const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE)
const audio = new Audio('../sounds/kalimba.mp3');
const audioAnalyser = require('web-audio-analyser')(audio);

let container, scene, camera, controls, renderer;
let geometry, material, mesh, light, plane;

const meshes = [];

audioAnalyser.analyser.fftSize = 1024;

init();
animate();

function init() {

  container = document.getElementById( 'container' );
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 100;

  controls = new OrbitControls(camera);

  material = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading, vertexColors: THREE.VertexColors, shininess: 0 } );

  for (var i = 0; i < 512; i++) {
    geometry = new THREE.BoxGeometry( 10, 10, 10 );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = i*10;

    scene.add( mesh );
    meshes.push( mesh );
  }

  light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
  light.color.setHex(0xC3BEF7);
  light.groundColor.setHex(0x8A4FFF);

  light.position.x = 0;
  light.position.y = 0;
  light.position.z = 200;
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: false } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xFDDAD, 1 );

  container.appendChild( renderer.domElement );

  audio.play();

}

function animate() {

  for (var i = 0; i < 512; i++) {
    meshes[i].scale.z = audioAnalyser.frequencies()[i]/32;
  }

  render();
  requestAnimationFrame( animate );
}

function render() {
  renderer.render( scene, camera );
}
