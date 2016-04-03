const THREE = require('three');

import {Util} from './Util';

export class Sphere
{
  constructor() {
    this.size = 50;
    this.segments = 60;

    this.vertexArray = [];
    this.vertexDegrees = [];

    this.geometry = new THREE.SphereGeometry(this.size, this.segments, this.segments);
    this.material = new THREE.MeshLambertMaterial({
      color: 0xffffff
    });

    this.vertices = this.geometry.vertices;

    this.radius = this.geometry.parameters.radius;
    this.waveFactor = this.radius / 30;

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.initiate();
  }

  initiate(){
    this.geometry.mergeVertices();
    this.setVertices();
    this.mesh.rotation.set(Util.toRadians(0), Util.toRadians(0), Util.toRadians(0));
  }

  setVertices(){
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertexArray[i] = this.radius;
      this.vertexDegrees[i] = Util.randomInt(0, 360);
      this.vertices[i].normalize().multiplyScalar(this.radius);
    }

    this.geometry.computeVertexNormals();
    this.geometry.computeFaceNormals();
    this.geometry.verticesNeedUpdate = true;
    this.geometry.elementsNeedUpdate = true;
    this.geometry.normalsNeedUpdate = true;
  }

  updateVertices(wriggleMultiplier){
    for (let i = 0; i < this.vertexArray.length; i++) {
      this.vertexDegrees[i] += 8 * wriggleMultiplier;
      const r = this.vertexArray[i] + Math.sin(Util.toRadians(this.vertexDegrees[i])) * this.waveFactor;
      this.vertices[i].normalize().multiplyScalar(r);
    }

    this.geometry.computeVertexNormals();
    this.geometry.computeFaceNormals();
    this.geometry.verticesNeedUpdate = true;
    this.geometry.elementsNeedUpdate = true;
    this.geometry.normalsNeedUpdate = true;
  }

  updateScale(baseMultiplier){
    this.mesh.scale.x = baseMultiplier;
    this.mesh.scale.y = baseMultiplier;
    this.mesh.scale.z = baseMultiplier;
  }

  getMesh(){
    return this.mesh;
  }

}
