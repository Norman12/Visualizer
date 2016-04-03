const THREE = require('three');
const ID3 = require('id3-parser');
const OrbitControls = require('three-orbit-controls')(THREE);
const WebAudioAnalyzer = require('web-audio-analyser');
const $ = require('jquery');

import {Sphere} from './Sphere';
import {Util} from './Util';

let container, scene, camera, controls, renderer;
let geometry, material, light, sphere;

const rendererWidth = window.innerWidth / 2;
const colors = [[0x8A4FFF, 0xC3BEF7], [0x231651, 0xFF8484], [0x1C3041, 0x18F2B2], [0xFF1654, 0xF3FFBD], [0xE71D36, 0xFF9F1C], [0x2274A5, 0xE83F6F], [0xBF3100, 0xEC9F05], [0x2AB7CA, 0xFED766], [0x3366aa, 0x66ff99]];

let isPlaying = false;
let canPlay = true;

let audio = new Audio('../sounds/kalimba.mp3');
let audioAnalyser = WebAudioAnalyzer(audio);

audioAnalyser.analyser.fftSize = 1024;

init();
togglePlay();
listenForAudioChange();
animate();

function init() {

  container = document.getElementById( 'container' );
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 40, rendererWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 150;
  camera.position.x = -170;
  camera.rotation.set(0, -0.83, 0);

  sphere = new Sphere();
  scene.add(sphere.getMesh());

  light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
  setRandomLightColor();

  light.position.x = 0;
  light.position.y = 0;
  light.position.z = 200;
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true } );
  renderer.setSize( rendererWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setClearColor( 0xFFFDFE, 1 );

  container.appendChild( renderer.domElement );

  audio.play();
  isPlaying = true;

  window.addEventListener('resize', function(){
    const width = window.innerWidth/2;

    camera.aspect = width / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( width, window.innerHeight );

  }, false);
}

function listenForAudioChange(){
  $('#file').change(function(e){
    const file = e.currentTarget.files[0];

    if(typeof file === 'undefined') return;

    canPlay = false;
    isPlaying = false;
    audio.pause();
    audio.src = '';

    ID3.parse(file).then(function(tag) {
        if(tag.hasOwnProperty('title') || typeof tag.title !== 'undefined' || tag.title != ''){
          $('#song-title').text(tag.title.toUpperCase());
        }else{
          $('#song-title').text(file.name);
        }

        if(tag.hasOwnProperty('artist') || typeof tag.artist !== 'undefined' || tag.artist != ''){
          $('#song-artist').text('By ' + tag.artist);
        }else{
          $('#song-artist').text('By ' + ' Unknown Artist');
        }
    });

    const objectUrl = URL.createObjectURL(file);
    audio = new Audio();
    audio.src = objectUrl;

    audioAnalyser = WebAudioAnalyzer(audio);
    audioAnalyser.analyser.fftSize = 1024;

    setRandomLightColor();

    audio.play();
    canPlay = true;
    isPlaying = true;
  });
}

function togglePlay(){
  $( '.control' ).click(function() {
    if(!canPlay) return;
    const icon = $(this).find( 'i' );

    if(isPlaying){
      icon.removeClass('fa-pause');
      icon.addClass('fa-play');
      audio.pause();
      isPlaying = false;

      $(this).css('margin-right', '36px');
    }else{
      icon.removeClass('fa-play');
      icon.addClass('fa-pause');
      audio.play();
      isPlaying = true;

      $(this).css('margin-right', '32px');
    }
  });
}

function setRandomLightColor(){
  let rand = Util.randomInt(0, colors.length-1);
  light.color.setHex(colors[rand][1]);
  light.groundColor.setHex(colors[rand][0]);
}

function animate() {
  if(isPlaying){
    sphere.updateScale(Util.fifthRoot(Util.norm(Util.mean(audioAnalyser.frequencies().slice(0,128)) + 0.1, 0, 256)));
    sphere.updateVertices(Util.norm(Util.mean(audioAnalyser.frequencies().slice(0,128)), 0, 256) * 3);
  }else{
    sphere.updateVertices(1);
  }

  render();
  requestAnimationFrame( animate );
}

function render() {
  renderer.render( scene, camera );
}
