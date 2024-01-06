import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'


console.log(OrbitControls);

const gui = new dat.GUI();
const world = {
  plane: {
    width: 3,
    height: 3,
    widthSegments:10,
    heightSegments:10
  },
};
gui.add(world.plane, "height", 1, 20).onChange(generatePlane);

gui.add(world.plane, "width", 1, 20).onChange(generatePlane);

gui.add(world.plane, "widthSegments", 1, 20).onChange(generatePlane);

gui.add(world.plane, "heightSegments", 1, 20).onChange(generatePlane);


function generatePlane(){
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );

  const { array } = planeMesh.geometry.attributes.position;

  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
  }
}
//6th
const raycaster=new THREE.Raycaster;
console.log(raycaster);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff0 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

new OrbitControls(camera,renderer.domElement)
camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(3, 3, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: true,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
//console.log(planeMesh.geometry.attributes.position.array);
const { array } = planeMesh.geometry.attributes.position;

for (let i = 0; i < array.length; i += 3) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];
  //console.log(array[i])
  array[i + 2] = z + Math.random(); //look like folding paper
}

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);
//4th 
const Backlight = new THREE.DirectionalLight(0xffffff, 1);
Backlight.position.set(0, 0, -1);
scene.add(Backlight);  

//5th
const mouse = {
  x:undefined,
  y:undefined
}

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  //planeMesh.rotation.x+=0.01;

  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse,camera)
  const intersects=raycaster.intersectObjects([planeMesh])
  console.log(intersects)
  if (intersects.length > 0) {
    // Intersection detected, do something with the intersected object(s)
    console.log('Intersection detected:', intersects);
} else {
    // No intersections
    console.log('No intersections detected');
}
}
//renderer.render(scene, camera);
animate();


addEventListener('mousemove',(event)=>{
 mouse.x = (event.clientX/innerWidth)*2-1
 mouse.y = -(event.clientY/innerHeight)*2+1

 //console.log(mouse)
})
