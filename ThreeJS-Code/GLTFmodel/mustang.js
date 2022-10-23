var sunSize = 1;
window.onload = function init()
{
	
	const canvas = document.getElementById( "gl-canvas" );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const renderer = new THREE.WebGLRenderer({canvas});
	renderer.setSize(canvas.width,canvas.height);

	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);

	camera = new THREE.PerspectiveCamera(75,canvas.width / canvas.height,0.1, 20000);
	camera.rotation.y = 45/180*Math.PI;
	camera.position.x = 150;
	camera.position.y = 150;
	camera.position.z = 150;

	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	hlight = new THREE.AmbientLight(0x404040,1);
	hlight.position.set(0,10,0);

	scene.add(hlight);

	sunlight = new THREE.PointLight (0x404040,10);
	sunlight.position.set(0,0,0);
	scene.add(sunlight);
	
	var distance = 40;
	


	const loader = new THREE.GLTFLoader();
	loader.load('./sun/scene.gltf', function(gltf){
	  sun = gltf.scene.children[0];
	  sun.scale.set(1,1,1);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	loader.load('./mercury/scene.gltf', function(gltf){
	  mercury = gltf.scene.children[0];
	  mercury.scale.set(0.1,0.1,0.1);
	  mercury.position.set(40,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});
	loader.load('./venus/scene.gltf', function(gltf){
	  venus = gltf.scene.children[0];
	  venus.scale.set(0.1,0.1,0.1);
	  venus.position.set(60,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});
	loader.load('./earth/scene.gltf', function(gltf){
	  earth = gltf.scene.children[0];
	  earth.scale.set(0.1,0.1,0.1);
	  earth.position.set(80,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});
	loader.load('./mars/scene.gltf', function(gltf){
	  mars = gltf.scene.children[0];
	  mars.scale.set(0.1,0.1,0.1);
	  mars.position.set(100,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	loader.load('./jupiter/scene.gltf', function(gltf){
	  jupiter = gltf.scene.children[0];
	  jupiter.scale.set(0.1,0.1,0.1);
	  jupiter.position.set(120,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	loader.load('./saturn/scene.gltf', function(gltf){
	  saturn = gltf.scene.children[0];
	  saturn.scale.set(0.1,0.1,0.1);
	  saturn.position.set(140,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});
	loader.load('./uranus/scene.gltf', function(gltf){
	  uranus = gltf.scene.children[0];
	  uranus.scale.set(0.0002,0.0002,0.0002);
	  uranus.position.set(160,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});
	loader.load('./neptune/scene.gltf', function(gltf){
	  neptune = gltf.scene.children[0];
	  neptune.scale.set(0.1,0.1,0.1);
	  neptune.position.set(180,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});
	loader.load('./moon/scene.gltf', function(gltf){
	  moon = gltf.scene.children[0];
	  moon.scale.set(0.1,0.1,0.1);
	  moon.position.set(200,0,0);
	  scene.add(gltf.scene);
	  animate();
	}, undefined, function (error) {
		console.error(error);
	});



	function animate() {
	   renderer.render(scene,camera);
	   requestAnimationFrame(animate);
	}

}