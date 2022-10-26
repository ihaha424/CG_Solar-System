class Planet{
    constructor (radius,rotationAxis,orbitalAxis,position,object){
        this.radius = radius;
        this.rotationAxis = rotationAxis;//자전축
        this.orbitalAxis = orbitalAxis;//공전축
        this.position = position;//standard 1 = 1AU
        this.object = object; // Planet/Star/Satellite
    }
}