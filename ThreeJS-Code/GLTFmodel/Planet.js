const loader = new THREE.GLTFLoader();
class Planet {
    constructor(name,type,radius) {
        console.log('Planet Constructor');
        this.name = name;
        this.type = type;
        this.radius = radius;
    }
    renderPlanet(){
        loader.load('./sun/scene.gltf', function(gltf){
	    sun = gltf.scene.children[0];
	    sun.scale.set(1,1,1);
	    scene.add(gltf.scene);
	    animate();
	    }, undefined, function (error) {
		console.error(error);
	    });
    }
}
