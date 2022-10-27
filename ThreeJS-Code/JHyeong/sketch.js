
// Ensure ThreeJS is in global scope for the 'examples/'

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  scaleToView: true
};
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;


//constants for planets : orbital cycle
const yearRatioMercury = 1/(88.0 / 365.0);
const yearRatioVenus = 1/(225 / 365.0);
const yearRatioMars = 1/1.9;
const yearRatioJupiter = 1/11.9;
const yearRatioSaturn = 1/29.5;
const yearRatioUranus = 1/84.0;
const yearRatioNeptune = 1/165;

//constants for planets : rotation cycle
const dayRatioMercury = 1/(58 + 15.5/60)
const dayRatioVenus = 1/(243 + 26/60)
const dayRatioMars = 1/(1 + 36/60);
const dayRatioJupiter = 1/(9/24 + 55/60);
const dayRatioSaturn = 1/(10/24 + 40/60);
const dayRatioUranus = 1/(17/24 + 14/60);
const dayRatioNeptune = 1/(16/24);




window.onload = function init() 
{
	const canvas = document.getElementById( "gl-canvas" );
  // RENDERER
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha : true,
  });
  renderer.setClearColor("#121212", 1);

  //relative variable
  var year = 0.15;
  var day = 0.3;

  // CAMERA
  const camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
  camera.position.set(30, 5, 35);

  // ORBIT CONTROLS
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(30, 0, 0);

  /*
   * TEXTURES
   */
  const loader = new THREE.TextureLoader();

  const sunTexture = loader.load("assets/sun.jpg");
  const mercuryTexture = loader.load("assets/mercury.jpg");
  const venusTexture = loader.load("assets/venus.jpg");
  const earthTexture = loader.load("assets/earth.jpg");
  const moonTexture = loader.load("assets/moon.jpg")
  const marsTexture = loader.load("assets/mars.jpg");
  const jupiterTexture = loader.load("assets/jupiter.jpg");
  const saturnTexture = loader.load("assets/saturn.jpg");
  const uranusTexture = loader.load("assets/uranus.jpg");
  const neptuneTexture = loader.load("assets/neptune.jpg");
  const plutoTexture = loader.load("assets/pluto.jpeg");

  /*
   * MATERIALS
   */
  const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
  const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
  const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
  const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
  const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture});
  const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
  const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
  const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
  const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
  const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
  const plutoMaterial = new THREE.MeshStandardMaterial({ map: plutoTexture });

  /*
   * MESH
   */
  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  sunMesh.position.set(0, 0, 0);
  sunMesh.scale.setScalar(10);
  scene.add(sunMesh);

  const mercuryGroup = new THREE.Group();
  const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
  createPlanet(scene, mercuryMesh, mercuryGroup, 25, 0.8);

  const venusGroup = new THREE.Group();
  const venusMesh = new THREE.Mesh(geometry, venusMaterial);
  createPlanet(scene, venusMesh, venusGroup, 28, 0.9);

  const moonGroup = new THREE.Group();
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  createPlanet(scene, moonMesh, moonGroup, 33, 0.3);

  const earthGroup = new THREE.Group();
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  createPlanet(scene, earthMesh, earthGroup, 31, 1);

  const marsGroup = new THREE.Group();
  const marsMesh = new THREE.Mesh(geometry, marsMaterial);
  createPlanet(scene, marsMesh, marsGroup, 34, 0.8);

  const jupiterGroup = new THREE.Group();
  const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
  createPlanet(scene, jupiterMesh, jupiterGroup, 42, 3.5);

  const saturnGroup = new THREE.Group();
  const saturnMesh = new THREE.Mesh(geometry, saturnMaterial);
  createPlanet(scene, saturnMesh, saturnGroup, 50, 2.9);

  const uranusGroup = new THREE.Group();
  const uranusMesh = new THREE.Mesh(geometry, uranusMaterial);
  createPlanet(scene, uranusMesh, uranusGroup, 56, 1.7);

  const neptuneGroup = new THREE.Group();
  const neptuneMesh = new THREE.Mesh(geometry, neptuneMaterial);
  createPlanet(scene, neptuneMesh, neptuneGroup, 60, 1.65);

  const plutoGroup = new THREE.Group();
  const plutoMesh = new THREE.Mesh(geometry, plutoMaterial);
  createPlanet(scene, plutoMesh, plutoGroup, 64, 0.5);

  /*
   * LIGHTING
   */
  const light = new THREE.PointLight("white", 1.25);
  light.position.set(0, 0, 0);
  scene.add(light);

  // illuminate the sun
  createSpotlights(scene);

  /*
   * HELPERS
   */
  scene.add(new THREE.PointLightHelper(light, 0.2));
  //scene.add( new THREE.SpotLightHelper( spotLightLeft ));
  scene.add(new THREE.GridHelper(75, 50));


  var clock = new THREE.Clock();
  var speed = 1;
  var delta = 0;

  const zAxis = new THREE.Vector3(0.25, 0, 0.25);
  
  mercuryGroup.rotateOnWorldAxis(zAxis, 5);

  // draw each frame
  render();

  function render(){
    time = clock.getElapsedTime();
    
    console.log(time);
    controls.update();
    sunMesh.rotation.y = time * 0.05

    mercuryGroup.rotation.y = time * year *yearRatioMercury;
    mercuryMesh.rotation.y = time * day * dayRatioMercury;
    
    

    venusGroup.rotation.y = time * year *yearRatioVenus;
    venusMesh.rotation.y = time * day * dayRatioVenus;

    moonGroup.rotation.y = time * year;
    moonMesh.rotation.y = time * day;    

    earthGroup.rotation.y = time * year;
    earthMesh.rotation.y = time * day;

    marsGroup.rotation.y = time * year *yearRatioMars;
    marsMesh.rotation.y = time * day*dayRatioMars;
    

    jupiterGroup.rotation.y = time * year * yearRatioJupiter;
    jupiterMesh.rotation.y = time * day * dayRatioJupiter

    saturnGroup.rotation.y = time * year *yearRatioSaturn;
    saturnMesh.rotation.y = time * day * dayRatioSaturn;

    uranusGroup.rotation.y = time * year *yearRatioUranus;
    uranusMesh.rotation.y = time * day * dayRatioUranus

    neptuneGroup.rotation.y = time * year *yearRatioNeptune;
    neptuneMesh.rotation.y = time * day * dayRatioNeptune;

    // plutoGroup.rotation.y = time * 0.005;
    // plutoMesh.rotation.y = time * year *yearRatioNeptune;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

      //controls.dispose();
      //renderer.dispose();
  function createPlanet(scene, mesh, group, x, scale) {
    mesh.position.set(x, 0, 0);
    mesh.scale.setScalar(scale);
    group.add(mesh);
    scene.add(group);
  }
  function createSpotlights(scene) {
  var color = 0xFFFFFF;
  var intensity = 5;
  var distance = 25;
  var angle = Math.PI/7;

  new Array(6).fill('').forEach((item, i) => {
    var spotlight = new THREE.SpotLight(color, intensity, distance, angle);
    var value = i % 2 === 0 ? 25 : -25;

    spotlight.position.set(
      i < 2 ? value : 0,
      i >= 2 && i < 4 ? value : 0,
      i >= 4 ? value : 0
    );
    scene.add( spotlight );
  });
}
};

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
