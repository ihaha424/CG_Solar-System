// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';// author: Fyrestar <info@mevedia.com>
var camera, scene, renderer, mesh, goal, keys, follow;

var time = 0;
var newPosition = new THREE.Vector3();
var matrix = new THREE.Matrix4();

var stop = 1;
var DEGTORAD = 0.01745327;
var temp = new THREE.Vector3;
var dir = new THREE.Vector3;
var a = new THREE.Vector3;
var b = new THREE.Vector3;
var coronaSafetyDistance = 0.3;
var velocity = 0.0;
var speed = 0.0;
var controls;

// init();

window.onload = function init() {

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  var radius   = 0.5,
        segments = 32,
        rotation = 6;  

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set( 0, 0.9, 0.9 );
    
  scene = new THREE.Scene();

  camera.lookAt( scene.position );

  var geometry = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );// 테스트용 큐브 object
  var material = new THREE.MeshNormalMaterial();

  var sphere = createSphere(radius, segments);
   sphere.rotation.y = rotation; 
   scene.add(sphere);


  controls = new THREE.OrbitControls(camera,renderer.domElement);

    mesh = new THREE.Mesh( geometry, material );
    
    goal = new THREE.Object3D;
    follow = new THREE.Object3D;
    follow.position.z = -coronaSafetyDistance;
    mesh.add( follow );
    
    goal.add( camera );
    scene.add( mesh );
 

    const loader = new THREE.CubeTextureLoader();//큐브형식으로 배경 
    const texture = loader.load([
        './space_ship/ress/space2-1.jpg',
        './space_ship/ress/space2-2.jpg',
        './space_ship/ress/space2-3.jpg',
        './space_ship/ress/space2-4.jpg',
        './space_ship/ress/space2-5.jpg',
        './space_ship/ress/space2-6.jpg',
    ]);
    texture.encoding = THREE.sRGBEncoding;
    scene.background = texture;



  // const loader2 = new THREE.GLTFLoader();// 우주선 gltf
   // loader2.load('./model/scene.gltf', function(gltf){
   //   spaceship = gltf.scene.children[0];
   //   spaceship.scale.set(0.03,0.03,0.03);
   //   spaceship.position.set(2,2,2)
   //   scene.add(gltf.scene);
   //   animate();
  // }, undefined, function (error) {
   //    console.error(error);
   // });

  
  
keys = {//방향키 초기화
    a: false,
    s: false,
    d: false,
    w: false
  };
  
  document.body.addEventListener( 'keydown', function(e) {
    
    const key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = true;
    
  });
  document.body.addEventListener( 'keyup', function(e) {
    
    const key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = false;
    
  });

  animate_spaceship();

function animate_spaceship() {

  // controls.update();

  requestAnimationFrame( animate_spaceship );
    
  speed = 0.0;
  
  if ( keys.w )//w면 앞으로
    speed = 0.01;
  else if ( keys.s )//s면 뒤로
    speed = -0.01;

  velocity += ( speed - velocity ) * .3;
  mesh.translateZ( velocity );

  if ( keys.a ){//a면 왼쪽 회전
    mesh.rotateY(0.05);
    
  }
  else if ( keys.d )//d면 오른쪽 회전
    mesh.rotateY(-0.05);
    
  //////////////////////////////////////////
  //이부분에서 물체 회전 할 때 카메라 회전하는게 조금 부자연스러워서 로직 수정해야함
  a.lerp(mesh.position, 0.4);
  b.copy(goal.position);//goal == camera
  
    dir.copy( a ).sub( b ).normalize();
    const dis = a.distanceTo( b ) - coronaSafetyDistance;
    goal.position.addScaledVector( dir, dis );
    goal.position.lerp(temp, 0.02);
    temp.setFromMatrixPosition(follow.matrixWorld);
    
    camera.lookAt( mesh.position );
    controls.target.set(mesh.position.x,mesh.position.y,mesh.position.z);
    
    renderer.render( scene, camera );
    controls.update();
    ///////////////////////

}

function createSphere(radius, segments) {
    return new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshPhongMaterial({
            map:         THREE.ImageUtils.loadTexture('space_ship/images/sun_detailed.png')
            // bumpMap:     THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
            // bumpScale:   0.005,
            ,specularMap: THREE.ImageUtils.loadTexture('space_ship/images/sun_alpha.jpg'),
            specular:    new THREE.Color('grey')
            ,shininess: 50                        
        })
    );
}

}