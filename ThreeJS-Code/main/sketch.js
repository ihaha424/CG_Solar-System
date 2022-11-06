import * as Planet from './src/constants/planets.js';
import * as Index from './src/constants/index.js';
import * as Planet_info from './src/constants/planets_info.js'

import * as CalculateOrbit from './cal_orbit.js';
const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  scaleToView: true
};
//compute angle
function angleToRad(angle) {
  return Math.PI / 180 * angle
}

//rotate XZ coordinate
function rotateXZ(x, z, rotate) {
  var xx = x * Math.cos(angleToRad(rotate)) - z * Math.sin(angleToRad(rotate))
  var zz = x * Math.sin(angleToRad(rotate)) + z * Math.cos(angleToRad(rotate))
  return [xx, zz]
}

// function makeCircle(radius = 30, rotate = 50, minAngle = 5) {

//   var vertices = []

//   for (var i = 0; i < 360; i += minAngle) {
//     // vertices.push(new THREE.Vector3(0, 0, 0))

//     var x = Math.cos(angleToRad(i)) * radius
//     var z = Math.sin(angleToRad(i)) * radius
//     var xn = Math.cos(angleToRad(i + minAngle)) * radius
//     var zn = Math.sin(angleToRad(i + minAngle)) * radius


//     vertices.push(new THREE.Vector3(rotateXZ(x, z, rotate)[0], 0, rotateXZ(x, z, rotate)[1]))
//     vertices.push(new THREE.Vector3(rotateXZ(xn, zn, rotate)[0], 0, rotateXZ(xn, zn, rotate)[1]))

//   }
//   return vertices
// }

//camera[0] option(global object)
var camera = [];
var projector, mouse = { x: 0, y: 0 };
var renderer;
var scene;
var controls, controls2;
//value is object distance z(정면에서 보기위해서)
var value_z = 0;
//move flag(버튼을 연속으로 못누르게 lock)
var flag = 0;
//rendering ID
var moveID;
var time;
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const tempV = new THREE.Vector3();
var planets_position = new THREE.Vector3();
var planets_Mesh;
//button spotlight
var spotlight2
var card
var flag_camera = 0;


//space_ship button
var s_flag = true;
var shipRenderID;
var timeScale = 1;
window.onload = function init() {
  //const realSunSize = Planet.SUN.radius;
  //console.log(realSunSize);
  //const realMercurySize = Planet.MERCURY.radius;
  //console.log(realMercurySize);
  //const p = SUN.radius;
  time = new Date();
  var canvas = document.getElementById("gl-canvas");
  // RENDERER
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });

  renderer.setClearColor("#121212", 1);

  // camera[0]
  camera[0] = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000);
  camera[0].position.set(0, 5000, 0);
  camera[1] = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000);
  const cameraToPoint = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();

  // ORBIT CONTROLS
  controls = new THREE.OrbitControls(camera[0], renderer.domElement);
  controls.target.set(30, 0, 0);
  controls2 = new THREE.OrbitControls(camera[1], renderer.domElement);
  controls2.maxDistance = 5;
  controls2.minDistance = 5;

  //picking
  class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
      this.pickedObjectSavedColor = 0;
      this.flag = true;
    }
    pick(normalizedPosition, scene, camera) {
      // 이미 다른 물체를 피킹했다면 색을 복원합니다
      if (this.pickedObject) {
        //   this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
        this.pickedObject = undefined;
        this.flag = true;
      }

      // 절두체 안에 광선을 쏩니다
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // 광선과 교차하는 물체들을 배열로 만듭니다
      const intersectedObjects = this.raycaster.intersectObjects(scene);
      if (intersectedObjects.length) {
        // 첫 번째 물체가 제일 가까우므로 해당 물체를 고릅니다
        this.pickedObject = intersectedObjects[0].object;
        if (this.flag == true) {
          flag_camera = 0;
          s_flag = true;
          this.flag = false;
          value_z = this.pickedObject.userData;
          this.pickedObject.getWorldPosition(tempV);
          moveCam(tempV.x, tempV.y, tempV.z, tempV.x, tempV.y, tempV.z, this.pickedObject);
        }
        // 기존 색을 저장해둡니다
        //this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
        // emissive 색을 빨강/노랑으로 빛나게 만듭니다
        //this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
      }
    }
  }
  const pickHelper = new PickHelper();

  /*
   * TEXTURES
   */
  const loader = new THREE.TextureLoader();

  const sunTexture = loader.load("assets/sun.jpg");
  const mercuryTexture = loader.load("assets/mercury.jpg");
  const venusTexture = loader.load("assets/venus.jpg");
  const earthTexture = loader.load("assets/earth.jpg");
  const moonTexture = loader.load("assets/moon.jpg");
  const marsTexture = loader.load("assets/mars.jpg");
  const jupiterTexture = loader.load("assets/jupiter.jpg");
  const saturnTexture = loader.load("assets/saturn.jpg");
  const uranusTexture = loader.load("assets/uranus.jpg");
  const neptuneTexture = loader.load("assets/neptune.jpg");
  const plutoTexture = loader.load("assets/pluto.jpeg");
  const saturnRingTexture1 = loader.load("assets/textures/saturn2_A_diffuse.png");
  const saturnRingTexture2 = loader.load("assets/textures/saturn2_A_specularGlossiness.png");
   /*
   * MATERIALS
   */
  const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
  const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
  const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
  const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
  const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});
  const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
  const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
  const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
  const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
  const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
  const plutoMaterial = new THREE.MeshStandardMaterial({ map: plutoTexture });

  const labelContainerElem = document.querySelector('#labels');//-DongMin
  const labelContainerElem2 = document.querySelector('#container2');//-DongMin

  //scene
  scene = new THREE.Scene();
  /*
    * background
    */
  const loader2 = new THREE.CubeTextureLoader();//큐브형식으로 배경 
  const texture = loader2.load([
    './space_ship/ress/space2-1.jpg',
    './space_ship/ress/space2-2.jpg',
    './space_ship/ress/space2-3.jpg',
    './space_ship/ress/space2-4.jpg',
    './space_ship/ress/space2-5.jpg',
    './space_ship/ress/space2-6.jpg',
  ]);
  texture.encoding = THREE.sRGBEncoding;
  scene.background = texture;

  var lineMaterial = new THREE.LineBasicMaterial({
    linewidth: 100
  });
  /*
  //loading??
  */

  function start_loading() {
    var scene_start = new THREE.Scene();


  }
  //controls.dispose();
  //renderer.dispose();
  function createPlanet(scene, mesh, group, x, scale, name) {//-DongMin
    if(name!="SATURNRING"){
    const elem = document.createElement('button');//-DongMin
    elem.textContent = name;//-DongMin
    elem.name = name;
    labelContainerElem.appendChild(elem);//-DongMin
    }

    mesh.position.set(x, 0, 0);
    console.log(x);
    mesh.scale.setScalar(scale);
    console.log(scale);
    mesh.userData = scale * 3;
    group.add(mesh);
    scene.add(group);
  }



  /*
   * MESH
   */
  const geometry = new THREE.SphereGeometry(1, 32, 16);
  //planets number
  var planets_number = 10;//-DongMin
  planets_Mesh = [];//-DongMin

  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  sunMesh.position.set(0, 0, 0);
  const sunSize = Planet.SUN.radius / Index.AU;
  sunMesh.scale.setScalar(sunSize);
  sunMesh.userData = sunSize * 3;
  scene.add(sunMesh);
  const elem = document.createElement('button');//-DongMin
  elem.textContent = "SUN";//-DongMin
  elem.name = "SUN";
  labelContainerElem.appendChild(elem);//-DongMin
  planets_Mesh = planets_Mesh.concat(sunMesh);//-DongMin

  const mercuryGroup = new THREE.Group();
  const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
  createPlanet(scene, mercuryMesh, mercuryGroup, 25, Planet.MERCURY.radius / Planet.SUN.radius * sunSize, "MERCURY");//-DongMin
  planets_Mesh = planets_Mesh.concat(mercuryMesh);//-DongMin
  mercuryMesh.rotation.y = Planet.MERCURY.tilt;



  const venusGroup = new THREE.Group();
  const venusMesh = new THREE.Mesh(geometry, venusMaterial);
  createPlanet(scene, venusMesh, venusGroup, 28, Planet.VENUS.radius / Planet.SUN.radius * sunSize, "VENUS");//-DongMin
  planets_Mesh = planets_Mesh.concat(venusMesh);//-DongMin
  venusMesh.rotation.y = Planet.VENUS.tilt;



  const earthGroup = new THREE.Group();
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  createPlanet(scene, earthMesh, earthGroup, 31, Planet.EARTH.radius / Planet.SUN.radius * sunSize, "EARTH");//-DongMin
  planets_Mesh = planets_Mesh.concat(earthMesh);//-DongMin
  earthMesh.rotation.y = Planet.EARTH.tilt;

  const marsGroup = new THREE.Group();
  const marsMesh = new THREE.Mesh(geometry, marsMaterial);
  createPlanet(scene, marsMesh, marsGroup, 34, Planet.MARS.radius / Planet.SUN.radius * sunSize, "MARS");//-DongMin
  planets_Mesh = planets_Mesh.concat(marsMesh);//-DongMin
  marsMesh.rotation.y = Planet.MARS.tilt;

  const jupiterGroup = new THREE.Group();
  const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
  createPlanet(scene, jupiterMesh, jupiterGroup, 42, Planet.JUPITER.radius / Planet.SUN.radius * sunSize, "JUPITER");//-DongMin
  planets_Mesh = planets_Mesh.concat(jupiterMesh);//-DongMin
  jupiterMesh.rotation.y = Planet.JUPITER.tilt;
  

  let saturnPlanetRingMesh = [];
  
  const saturnGroup = new THREE.Group();
  const saturnMesh = new THREE.Mesh(geometry, saturnMaterial);
  createPlanet(scene, saturnMesh, saturnGroup, 50, Planet.SATURN.radius / Planet.SUN.radius * sunSize, "SATURN");//-DongMin

  let saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture1 });
  let geometry_ring = new THREE.TorusGeometry(6.5, 0.7, 2, 50);
  let saturnRingMesh = new THREE.Mesh(geometry_ring,saturnRingMaterial);
  
  saturnPlanetRingMesh.push(saturnRingMesh);

  geometry_ring = new THREE.TorusGeometry(8, 0.7, 2, 50);
  saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture2 });
  saturnRingMesh = new THREE.Mesh(geometry_ring, saturnRingMaterial);
  
  saturnPlanetRingMesh.push(saturnRingMesh);

  saturnPlanetRingMesh.forEach(w => {
    w.rotation.x = 2;
    w.rotation.y = 0.7;
    createPlanet(scene, w, saturnGroup, 50, (Planet.SATURN.radius / Planet.SUN.radius * sunSize)/4, "SATURNRING");//-DongMin
  });

  
  planets_Mesh = planets_Mesh.concat(saturnMesh);//-DongMin
  saturnMesh.rotation.y = Planet.SATURN.tilt;



  const uranusGroup = new THREE.Group();
  const uranusMesh = new THREE.Mesh(geometry, uranusMaterial);
  createPlanet(scene, uranusMesh, uranusGroup, 56, Planet.URANUS.radius / Planet.SUN.radius * sunSize, "URANUS");//-DongMin
  planets_Mesh = planets_Mesh.concat(uranusMesh);//-DongMin
  uranusMesh.rotation.y = Planet.URANUS.tilt;

  const neptuneGroup = new THREE.Group();
  const neptuneMesh = new THREE.Mesh(geometry, neptuneMaterial);
  createPlanet(scene, neptuneMesh, neptuneGroup, 60, Planet.NEPTUNE.radius / Planet.SUN.radius * sunSize, "NEPTUNE");//-DongMin
  planets_Mesh = planets_Mesh.concat(neptuneMesh);//-DongMin
  neptuneMesh.rotation.y = Planet.NEPTUNE.tilt;

  const plutoGroup = new THREE.Group();
  const plutoMesh = new THREE.Mesh(geometry, plutoMaterial);
  createPlanet(scene, plutoMesh, plutoGroup, 64, Planet.PLUTO.radius / Planet.SUN.radius * sunSize, "PLUTO");//-DongMin
  planets_Mesh = planets_Mesh.concat(plutoMesh);//-DongMin
  plutoMesh.rotation.y = Planet.PLUTO.tilt;

  const moonGroup = new THREE.Group();
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  createPlanet(scene, moonMesh, moonGroup, 32, (Planet.EARTH.radius / Planet.SUN.radius * sunSize, "MOON")*(17/64))
  earthGroup.add(moonGroup);

  function returnOrbit (planet, radius) {
    var computed_list = []

    for (var i = 0; i < radius; i++) {
      console.log(planet)
      computed = CalculateOrbit.cal_orbit(planet, radius * radius * 100);
      
      computed_list.push( new THREE.Vector3(computed.pos.x / Index.AU, 0 ,computed.pos.y / Index.AU));

    }

    return computed_list;

  } 


  //lines
  var lines = {}
  console.log(Index.SOLAR_SYSTEM)
  for (var planet in Index.SOLAR_SYSTEM) {
    console.log(Index.SOLAR_SYSTEM[planet]);
    if (Index.SOLAR_SYSTEM[planet] == 'SUN') {
      continue;
    }
    else {
      var lineGeometry = new THREE.BufferGeometry().setFromPoints(returnOrbit(Index.SOLAR_SYSTEM[planet], planet*1000));
      lines[Index.SOLAR_SYSTEM[planet]] = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(lines[Index.SOLAR_SYSTEM[planet]]);
    }
  }

  /*
   * LIGHTING
   */


  const sunlight = new THREE.DirectionalLight("white", 1);
  sunlight.position.set(1000, 0, 0);
  scene.add(sunlight);

  const light = new THREE.SpotLight("white", 1);
  light.position.set(0, 1000, 0);

  scene.add(light);

  // illuminate the sun
  createSpotlights(scene);

  //button spotlight
  spotlight2 = new THREE.PointLight(0xFFFFFF, 1);
  spotlight2.position.set(0, 0, 0);
  scene.add(spotlight2);

  /*
   * HELPERS
   */
  scene.add(new THREE.PointLightHelper(light, 0.5));

  //scene.add( new THREE.SpotLightHelper( spotLightLeft ));
  // scene.add(new THREE.GridHelper(75, 50));//그리드 생성기


  var clock = new THREE.Clock();
  var speed = 1;
  var delta = 0;
  var movement = 1;

  /*
  //picking
  */
  const pickPosition = { x: 0, y: 0 };
  clearPickPosition();

  function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * canvas.width / rect.width,
      y: (event.clientY - rect.top) * canvas.height / rect.height,
    };
  }

  function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width) * 2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // Y 축을 뒤집었음
  }

  function clearPickPosition() {
    /**
     * 마우스의 경우는 항상 위치가 있어 그다지 큰
     * 상관이 없지만, 터치 같은 경우 사용자가 손가락을
     * 떼면 피킹을 멈춰야 합니다. 지금은 일단 어떤 것도
     * 선택할 수 없는 값으로 지정해두었습니다
     **/
    pickPosition.x = -100000;
    pickPosition.y = -100000;
  }

  window.addEventListener('mousedown', setPickPosition);
  window.addEventListener('mouseup', clearPickPosition);

  var computed;

  

  // for (var each_planet in Index.SOLAR_SYSTEM) {

  //   console.log(each_planet[]);
  //   renderOrbit(each_planet);
  // }



  // draw each frame
  render();


  function render(time) {
    // var time = clock.getElapsedTime(); 
    // console.log(time);
    controls.update();

    
    var rate;
    movement += 0.01;

    sunMesh.rotation.y = movement * 0.05

    // if (line_visualize)
    //   line.
    // else
    //   line.geometry.setFromPoints([])

    document.
      getElementById("timeScaleSlider").
      addEventListener("change", function (event) {
      timeScale = Number(event.target.value);
      });
    
      
    //mercuryGroup.rotation.y = movement * 0.5;
    computed = CalculateOrbit.cal_orbit('MERCURY', timeScale);
    mercuryGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    mercuryMesh.rotation.y = movement * 0.20;

    //console.log(computed.pos.x/Index.AU,computed.pos.y/Index.AU)
    computed = CalculateOrbit.cal_orbit('VENUS', timeScale);
    venusGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    //venusGroup.rotation.y = movement * 0.35;
    venusMesh.rotation.y = movement * 0.18;

    computed = CalculateOrbit.cal_orbit('EARTH', timeScale);
    earthGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    earthMesh.rotation.y = movement * 0.15;
    earthGroup.rotation.y = movement * 0.15;

    moonMesh.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    moonGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    moonMesh.rotation.y = movement * 0.3;
    // console.log(moonMesh.position)
    // console.log(earthGroup.position)

    computed = CalculateOrbit.cal_orbit('MARS', timeScale);
    marsGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    //marsGroup.rotation.y = movement * 0.2;
    marsMesh.rotation.y = movement * 0.2;

    computed = CalculateOrbit.cal_orbit('JUPITER', timeScale);
    jupiterGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    //jupiterGroup.rotation.y = movement * 0.05;
    jupiterMesh.rotation.y = movement * 0.05;

    computed = CalculateOrbit.cal_orbit('SATURN', timeScale);
    saturnGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    //saturnGroup.rotation.y = movement * 0.03;
    saturnMesh.rotation.y = movement * 0.25;

    computed = CalculateOrbit.cal_orbit('URANUS', timeScale);
    uranusGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    //uranusGroup.rotation.y = movement * 0.02;
    uranusMesh.rotation.y = movement * 0.25;

    computed = CalculateOrbit.cal_orbit('NEPTUNE', timeScale);
    neptuneGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    //neptuneGroup.rotation.y = movement * 0.015;
    neptuneMesh.rotation.y = movement * 0.25;

    computed = CalculateOrbit.cal_orbit('PLUTO', timeScale);
    plutoGroup.position.set(computed.pos.x / Index.AU, 0, computed.pos.y / Index.AU);
    //plutoGroup.rotation.y = movement * 0.005;
    plutoMesh.rotation.y = movement * 0.2;

    const minVisibleDot = 0.2;
    // 카메라의 상대 방향을 나타내는 행렬 좌표를 가져옵니다.
    normalMatrix.getNormalMatrix(camera[0].matrixWorldInverse);
    // 카메라의 위치를 가져옵니다.
    camera[0].getWorldPosition(cameraPosition);

    for (var i = 0; i < 10; i++) {
      planets_Mesh[i].updateWorldMatrix(true, false);
      planets_Mesh[i].getWorldPosition(planets_position);
      
      // tempV.copy(planets_position);
      // tempV.applyMatrix3(normalMatrix);
 
      // // 카메라로부터 이 위치까지의 거리를 계산합니다.
      // cameraToPoint.copy(planets_position);
      // cameraToPoint.applyMatrix4(camera[0].matrixWorldInverse).normalize();
      
      // const dot = tempV.dot(cameraToPoint);
 
      // // 카메라를 바라보지 않는다면 이름표를 숨깁니다.
      // if (dot < minVisibleDot) {
      //   labelContainerElem.childNodes[i].style.display = 'none';
      //   continue;
      // }
      // labelContainerElem.childNodes[i].style.display = '';
 
      tempV.copy(planets_position);
      tempV.project(camera[0]);
      //console.log(i,tempV);
      if ((tempV.x < -1 && tempV.x > 1) || (tempV.y < -1 && tempV.y > 1)) {
        labelContainerElem.childNodes[i].style.display = 'none';
        continue;
      }
      labelContainerElem.childNodes[i].style.display = '';
      const x = (tempV.x * .5+ .5) * canvas.clientWidth;
      const y = (tempV.y * -.5 + .5) * canvas.clientHeight - 50+i*10;
      labelContainerElem.childNodes[i].style.transform = `translate(-50%, -50%) translate(${ x }px,${ y }px)`;
    
    }

    spotlight2.position.set(camera[0].position.x, camera[0].position.y, camera[0].position.z);
    time *= 0.001;
    pickHelper.pick(pickPosition, planets_Mesh, camera[flag_camera]);


    requestAnimationFrame(render);
    renderer.render(scene, camera[0]);
  }

  

  function createSpotlights(scene) {
    var color = 0xFFFFFF;
    var intensity = 5;
    var distance = 25;
    var angle = Math.PI / 7;

    new Array(6).fill('').forEach((item, i) => {
      var spotlight = new THREE.SpotLight(color, intensity, distance, angle);
      var value = i % 2 === 0 ? 25 : -25;

      spotlight.position.set(
        i < 2 ? value : 0,
        i >= 2 && i < 4 ? value : 0,
        i >= 4 ? value : 0
      );
      scene.add(spotlight);
    });
  }

  //camera[0] button
  var button_list = [];
  var object_num = 0;
  for (var i = 0; i < planets_number; i++) {
    button_list = button_list.concat("Button" + i);
  }
  //sun
  document.getElementById(button_list[0]).onclick = function (event) {
    value_z = 15;//value_Z는 정면에서 보기 위한 z축의 값
    object_num = 0;
    sunMesh.updateWorldMatrix(true, false);
    planets_Mesh[0].getWorldPosition(tempV);

    moveCam(tempV.x, tempV.y, tempV.z, tempV.x, tempV.y, tempV.z, planets_Mesh[0]);
    //moveCam(scene.children[object_num].position.x,scene.children[object_num].position.y,scene.children[object_num].position.z,scene.children[object_num].position.x,scene.children[object_num].position.y,scene.children[object_num].position.z);
    var card = document.querySelector(".planet-card");
      card.style.visibility = "visible";//버튼 누르면 설명창 보이게
      var p_name = event.target.innerText;

      let planet_index;
      planet_index = getplanetIndex(p_name);
      var target_planet = (Planet_info.PLANETS[planet_index]);

      let x = document.getElementsByClassName("title");
      x = document.getElementsByTagName("h2")[0];
      x.innerText=target_planet.name;
      
      let meanTemp = document.querySelector(".meanTemp");
      meanTemp.innerText = target_planet.meanTemp;

      let caption = document.querySelector(".caption");
      caption.innerText = target_planet.caption;

      let description = document.querySelector(".description");
      description.innerText = target_planet.description;

      let radius = document.querySelector(".Radius");
      radius.innerText = target_planet.radius +" km";

      let timesLarger = document.querySelector(".timesLarger");
      timesLarger.innerText = target_planet.timesLarger +"X";

      let distanceFromSun = document.querySelector(".distanceFromSun");
      distanceFromSun.innerText = target_planet.distanceFromSun +" AU";

      let year = document.querySelector(".year");
      year.innerText = target_planet.year;

      let day = document.querySelector(".day");
      day.innerText = target_planet.day;

      let moons = document.querySelector(".moons");
      moons.innerText = target_planet.moons;

      document.querySelector(".close").onclick = function(){
        card = document.querySelector(".planet-card");
        card.style.visibility = "hidden";//x누르면 설명창 꺼짐
      };

      x = document.querySelector(".planet-img");
      x.src = "./assets/cards/"+p_name.toLowerCase()+".png";
  };
  labelContainerElem.childNodes[0].onclick = function (event) {
    value_z = 15;
    sunMesh.updateWorldMatrix(true, false);
    planets_Mesh[0].getWorldPosition(tempV);
    moveCam(tempV.x, tempV.y, tempV.z, tempV.x, tempV.y, tempV.z, planets_Mesh[0]);
    
  };

  //plant
  for (i = 1; i < planets_number; i++) {
    var temp_button = document.getElementById(button_list[i])
    temp_button.button = i;

    temp_button.onclick = function (event) {
      //scene.children[5].children[0].position.x
      value_z = 5;//value_Z는 정면에서 보기 위한 z축의 값
      object_num = event.path[0].button;//plant order
      // moveCam(scene.children[object_num].children[0].position.x,scene.children[object_num].children[0].position.y,scene.children[object_num].children[0].position.z,scene.children[object_num].children[0].position.x,scene.children[object_num].children[0].position.y,scene.children[object_num].children[0].position.z);

      planets_Mesh[object_num].getWorldPosition(tempV);

      moveCam(tempV.x, tempV.y, tempV.z, tempV.x, tempV.y, tempV.z, planets_Mesh[object_num]);
      //해당하는 행성의 버튼을누르면 그에대한 정보를 보여주는 창 
      var card = document.querySelector(".planet-card");
      card.style.visibility = "visible";//버튼 누르면 설명창 보이게
      var p_name = event.target.innerText;
      let planet_index;
      planet_index = getplanetIndex(p_name);
      var target_planet = (Planet_info.PLANETS[planet_index]);

      let x = document.getElementsByClassName("title");
      x = document.getElementsByTagName("h2")[0];
      x.innerText=target_planet.name;
  

      let meanTemp = document.querySelector(".meanTemp");
      meanTemp.innerText = target_planet.meanTemp;

      let caption = document.querySelector(".caption");
      caption.innerText = target_planet.caption;

      let description = document.querySelector(".description");
      description.innerText = target_planet.description;

      let radius = document.querySelector(".Radius");
      radius.innerText = target_planet.radius +" km";

      let timesLarger = document.querySelector(".timesLarger");
      timesLarger.innerText = target_planet.timesLarger +"X";

      let distanceFromSun = document.querySelector(".distanceFromSun");
      distanceFromSun.innerText = target_planet.distanceFromSun +" AU";

      let year = document.querySelector(".year");
      year.innerText = target_planet.year;

      let day = document.querySelector(".day");
      day.innerText = target_planet.day;

      let moons = document.querySelector(".moons");
      moons.innerText = target_planet.moons;

      document.querySelector(".close").onclick = function(){
        card = document.querySelector(".planet-card");
        card.style.visibility = "hidden";//x누르면 설명창 꺼짐
      };

      x = document.querySelector(".planet-img");
      x.src = "./assets/cards/"+p_name.toLowerCase()+".png";

    };
    labelContainerElem.childNodes[i].id = i;
    labelContainerElem.childNodes[i].onclick = function (event) {
      value_z = 5;//value_Z는 정면에서 보기 위한 z축의 값
      object_num = event.path[0].id;
      planets_Mesh[object_num].getWorldPosition(tempV);
      moveCam(tempV.x, tempV.y, tempV.z, tempV.x, tempV.y, tempV.z, planets_Mesh[object_num]);
    }
  }


  function getplanetIndex(name){//행성의 이름을 index화 하여 html에서 element 찾기위한 함수
    let p_index=0;
    switch(name){
      case "MERCURY":
        p_index = 1;
        break;
      case "VENUS":
        p_index = 2;
        break;
      case "EARTH":
        p_index = 3;
        break;
      case "MARS":
        p_index = 4;
        break;
      case "JUPITER":
        p_index = 5;
        break;
        case "SATURN":
        p_index = 6;
        break;
      case "URANUS":
        p_index = 7;
        break;
      case "NEPTUNE":
        p_index = 8;
        break;
      case "PLUTO":
        p_index = 9;
        break;
      default:
        p_index =0;
    }
    return p_index;
  }
  document.getElementById("Button_Init").onclick = function () {
    value_z = 0;
    controls.maxDistance = 1000000;
    controls.minDistance = 30;
    moveCam(0, 5000, 0, 0, 0, 0, 0);
    card = document.querySelector(".planet-card");
    card.style.visibility = "hidden";//init 누르면 설명창 꺼짐
  };

  /*
  * Space Ship
  */
  document.getElementById("Button_Space_ship").onclick = function () {
    if (s_flag) {
      card = document.querySelector(".planet-card")
      card.style.visibility = "hidden";
      labelContainerElem.style.display = 'none';
      labelContainerElem2.style.display = 'none';
      space_ship_render();
      lineMaterial.visible = false;
      s_flag = false;
    }
    else {
      labelContainerElem.style.display = '';
      labelContainerElem2.style.display = '';
      scene.remove(mesh_ship);
      value_z = 0;
      spotlight2.value = 3;
      controls.maxDistance = 1000;
      controls.minDistance = 5;
      moveCam(0, 5000, 0, 0, 0, 0, 0);
      s_flag = true;
      lineMaterial.visible = true;
    }

  };


};


//camera[0] moving -DongMin
function moveCam(eye_x, eye_y, eye_z, target_x, target_y, target_z, Mesh) {
  if (flag == 1) {
    return;
  }
  console.log(Mesh);
  //button lock
  flag = 1;
  window.cancelAnimationFrame(moveID);
  window.cancelAnimationFrame(shipRenderID);
  var loading_num = 200;

  //move eye changeed value(변화량)
  var m_e_x = (eye_x - camera[0].position.x) / loading_num;
  var m_e_y = (eye_y - camera[0].position.y) / loading_num;
  var m_e_z = (eye_z - camera[0].position.z + value_z) / loading_num;
  //move target changeed value(변화량)
  var m_t_x = (target_x - controls.target.x) / loading_num;
  var m_t_y = (target_y - controls.target.y) / loading_num;
  var m_t_z = (target_z - controls.target.z) / loading_num;

  // console.log(m_e_x,m_e_y,m_e_z);
  // console.log(m_t_x,m_t_y,m_t_z);

  //camera[0] position
  var c_x = camera[0].position.x;
  var c_y = camera[0].position.y;
  var c_z = camera[0].position.z;

  //target position
  var t_x = controls.target.x;
  var t_y = controls.target.y;
  var t_z = controls.target.z;
  var i = 0;

  function move_view() {
    i++;
    camera[0].position.set(c_x + i * m_e_x, c_y + i * m_e_y, c_z + i * m_e_z);
    controls.target.set(t_x + i * m_t_x, t_y + i * m_t_y, t_z + i * m_t_z);
    renderer.render(scene, camera[0]);
    controls.update();
    if (i != loading_num)
      moveID = window.requestAnimationFrame(move_view);
    else {
      window.cancelAnimationFrame(moveID);
      function move_object() {
        Mesh.getWorldPosition(tempV);
        controls.maxDistance = Mesh.userData;
        controls.minDistance = Mesh.userData;
        controls.target.set(tempV.x, tempV.y, tempV.z);
        //클릭시 빛....애매함.
        renderer.render(scene, camera[0]);
        controls.update();
        moveID = window.requestAnimationFrame(move_object);
      }
      if (Mesh != 0) {
        move_object();
      }
      //button unlock
      flag = 0;
    }
  }
  move_view();
}
/*
* Spcae ship
*/
var mesh_ship = new THREE.Mesh();
var gltfloader = new THREE.GLTFLoader();
gltfloader.load('assets/spaceship.gltf', function (gltf) {
  gltf.scene.children[0].scale.set(0.1, 0.1, 0.1);
  mesh_ship = gltf.scene.children[0];
  console.log(mesh_ship)
  //spaceship.scene.position.set(tempEarth.x,tempEarth.y + 2,tempEarth.z);
  // spaceship.scene.scale.set(0.01, 0.01, 0.01);
  // spaceship.scene = gltf.scene;
  // console.log(scene);
});
function space_ship_render() {
  window.cancelAnimationFrame(moveID);
  window.cancelAnimationFrame(shipRenderID);
  var speed = 0.0;
  var follow, keys;
  var coronaSafetyDistance = 0.3;
  var velocity = 0.0;
  var temp = new THREE.Vector3;
  var dir = new THREE.Vector3;
  var temp = new THREE.Vector3;
  var dir = new THREE.Vector3;
  var a = new THREE.Vector3;
  var b = new THREE.Vector3;

  var tempEarth = new THREE.Vector3();
  planets_Mesh[3].getWorldPosition(tempEarth);
  console.log(tempEarth.x, tempEarth.y + 2, tempEarth.z)

  mesh_ship.position.set(tempEarth.x, tempEarth.y + 5, tempEarth.z);
  scene.add(mesh_ship);

  //goal_ship = new THREE.Object3D;
  follow = new THREE.Object3D;
  follow.position.z = -coronaSafetyDistance;
  mesh_ship.add(follow);

  //goal_ship.add( camera[1] );

  keys = {//방향키 초기화
    a: false,
    s: false,
    d: false,
    w: false,
    j: false,
    k: false,
    h: false
  };

  document.body.addEventListener('keydown', function (e) {

    const key = e.code.replace('Key', '').toLowerCase();
    if (keys[key] !== undefined)
      keys[key] = true;

  });
  document.body.addEventListener('keyup', function (e) {

    const key = e.code.replace('Key', '').toLowerCase();
    if (keys[key] !== undefined)
      keys[key] = false;

  });
  value_z = 5;
  flag_camera = 1;
  camera[1].position.set(mesh_ship.position.x, mesh_ship.position.y + 1, mesh_ship.position.z - 2);
  animate_spaceship();


  function animate_spaceship() {

    // controls.update();

    shipRenderID = requestAnimationFrame(animate_spaceship);


    if (keys.j)//w면 앞으로
      speed = speed + 0.01;
    else if (keys.k)//w면 앞으로
      speed = speed - 0.01;
    else if (keys.h)//w면 앞으로
      speed = 0;
    // else if ( keys.s )//s면 뒤로
    //   speed = -0.1;

    velocity += (speed - velocity) * .3;
    mesh_ship.translateY(velocity);

    if (keys.a) {//a면 왼쪽 회전
      mesh_ship.rotateY(0.02);
    }
    else if (keys.d)//d면 오른쪽 회전
      mesh_ship.rotateY(-0.02);
    else if (keys.w)//d면 오른쪽 회전
      mesh_ship.rotateX(0.02);
    else if (keys.s)//d면 오른쪽 회전
      mesh_ship.rotateX(-0.02);

    //////////////////////////////////////////
    //이부분에서 물체 회전 할 때 카메라 회전하는게 조금 부자연스러워서 로직 수정해야함
    a.lerp(mesh_ship.position, 0.4);
    //b.copy(goal_ship.position);//goal == camera[0]

    dir.copy(a).sub(b).normalize();
    const dis = a.distanceTo(b) - coronaSafetyDistance;
    // goal_ship.position.addScaledVector( dir, dis );
    // goal_ship.position.lerp(temp, 0.1);
    temp.setFromMatrixPosition(follow.matrixWorld);

    //camera[1].position.set( mesh_ship.position.x,mesh_ship.position.y,mesh_ship.position.z + value_z);

    camera[1].lookAt(mesh_ship.position);
    controls2.target.set(mesh_ship.position.x, mesh_ship.position.y, mesh_ship.position.z);
    spotlight2.value = 1;
    spotlight2.position.set(camera[1].position.x, camera[1].position.y, camera[1].position.z);

    renderer.render(scene, camera[1]);
    controls2.update();
    ///////////////////////

  }
}