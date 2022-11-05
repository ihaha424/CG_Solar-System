import * as Planet from './src/constants/planets.js';
import * as Index from './src/constants/index.js';
let changed = false;
let today = new Date();
var year;
var month;
var day;
export function cal_orbit(planetName,timeScale){
  getTimeFromHTML();
  today.setTime(today.getTime() + 1*timeScale);
  //console.log(today);

  //var seconds = new Date().getSeconds();
  //console.log(seconds);

  let epochTime = (today - Index.J2000)/1000; // 현재 시간(단위 : 초)
  let tDays = epochTime / Index.DAY; // 일수

  let T = tDays / Index.CENTURY; // 지난 세기

  let computedTime;
  let keys; 
  let obj;
    //console.log(planetName);
  switch (planetName) {
    case 'SUN': 
        keys = Object.keys(Planet.SUN.orbit.base);
        obj = Planet.SUN;
        break;
    case 'MERCURY' : 
        keys = Object.keys(Planet.MERCURY.orbit.base);
        obj = Planet.MERCURY;
        break;
    case 'VENUS' : 
        keys = Object.keys(Planet.VENUS.orbit.base);
        obj = Planet.VENUS;
        break;
    case 'EARTH' : 
        keys = Object.keys(Planet.EARTH.orbit.base);
        obj = Planet.EARTH;
        break;
    case 'MARS' : 
        keys = Object.keys(Planet.MARS.orbit.base);
        obj = Planet.MARS;
        break;
    case 'JUPITER' : 
        keys = Object.keys(Planet.JUPITER.orbit.base);
        obj = Planet.JUPITER;
        break;
    case 'SATURN' : 
        keys = Object.keys(Planet.SATURN.orbit.base);
        obj = Planet.SATURN;
        break;
    case 'URANUS' : 
        keys = Object.keys(Planet.URANUS.orbit.base);
        obj = Planet.URANUS;
        break;
    case 'NEPTUNE' : 
        keys = Object.keys(Planet.NEPTUNE.orbit.base);
        obj = Planet.NEPTUNE;
        break;
    case 'PLUTO' : 
        keys = Object.keys(Planet.PLUTO.orbit.base);
        obj = Planet.PLUTO;
        break;
    default : 
        console.log("ERROR : This object is not in solar system");
        break;
    }

  let computed = {
    time : epochTime,
  };
  computed = keys.reduce((carry,el)=>{
    const variation = obj.orbit.cy||0;
    carry[el] = obj.orbit.base[el] + (variation[el] * T);
    return carry;
  },computed);

  computed.w = computed.lp - computed.o;

  computed.M = computed.l - computed.lp;

  computed.a *= 1000;
  computed.i *= Index.DEG_TO_RAD;
  computed.o *= Index.DEG_TO_RAD;
  computed.w *= Index.DEG_TO_RAD;
  computed.M *= Index.DEG_TO_RAD;


function kepler(e, M) {
  return x => {
    //console.log(typeof(x));
    return x + (M + e * Math.sin(x) - x) / (1 - e * Math.cos(x));
    
  };
}
function getEccentricity(callback, x0, maxCount) {
  let x = 0;
  let x2 = x0;
  for(let i = 0; i < maxCount; i++) {
    x = x2;
    x2 = callback(x);
  }
  return x2;
}
  computed.E = getEccentricity(kepler(computed.e, computed.M), computed.M, 6);
  //const E = computed.M + 0.85 * computed.e * (Math.sign(Math.sin(computed.M)));/* E =108.8962365500302 */
  computed.pos = {x : null,y : null};
  computed.pos.x = computed.a * (Math.cos(computed.E)-computed.e);
  computed.pos.y = computed.a * (Math.sqrt(1-(computed.e * computed.e))) * Math.sin(computed.E);

  computed.r = Math.sqrt(Math.pow(computed.pos.x,2)+ Math.pow(computed.pos.y,2));
  computed.v = Math.atan2(computed.pos.y,computed.pos.x);

  computed.r /= (1000*Index.AU);
  computed.v *= Index.RAD_TO_DEG;
  computed.pos.x *= 2;
  computed.pos.y *= 2;
  //console.log(computed.v);
  return computed;
}
function getTimeFromHTML() {
  var temp;
  document.
    getElementById("demo-mobile-picker-button").
    addEventListener("change", function (event) {
      temp = event.target.value;
      year = temp.split('년');
      month = year[1].split('월');
      day = month[1].split('일');
      //console.log(seconds);
      today = new Date(year[0], month[0], day[0]);
    });
  }
