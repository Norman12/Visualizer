const THREE = require('three');

export class Util {

  static randomRange(min, max){
    return min + Math.random() * (max - min);
  }

  static randomInt(min, max){
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  static lerp(value, min, max){
    return min + (max - min) * value;
  }

  static norm(value, min, max){
    return (value - min) / (max - min);
  }

  static shuffle(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
  }

  static map(value, min1, max1, min2, max2){
    return lerp(norm(value, min1, max1), min2, max2);
  }

  static randomVector3(range){
    return new THREE.Vector3(randomRange(-range,range), randomRange(-range,range), randomRange(-range,range));
  }

  static toRadians(degrees){
    return degrees * Math.PI / 180;
  }

  static fifthRoot(value){
    return Math.pow(value, 1/5);
  }

  static mean(o){
    let s = 0;

    for(let i = 0; i < o.length; i++){
      s = s + o[i];
    }

    return s/o.length;
  }

}
