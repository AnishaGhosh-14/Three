import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


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

// const Backlight = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 0, -1);
// scene.add(Backlight);

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  //planeMesh.rotation.x+=0.01;

  renderer.render(scene, camera);
}
renderer.render(scene, camera);
animate();
