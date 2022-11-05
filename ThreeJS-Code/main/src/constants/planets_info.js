import { AU, SIDERAL_DAY, NM_TO_KM, DAY, HOUR } from './index.js';
//import { Color } from '../../node_modules/three';
//const TEX_DIR = 'static/images/surface/';

export const PLANETS=[
    {
        id: 'sun',
        name: 'The Sun',
        mass: 1.9891e30,
        radius: 6.96342e5,
        sideralDay: 25.6 * DAY,
        k: 0.01720209895,
        caption: "Yellow dwarf star",
        description: "The Sun is the center of our solar system and source of life on Earth. The temperature in Sun's core is about 15 million °C (27 million °F).",
        year: "230 milion Earth years",
        day: null,
        radius: 695508,
        meanTemp: 5500,
        timesLarger: 109.2,
        orbit: {
            base: {
                a: 0,
                e: 0,
                i: 0,
                l: 0,
                lp: 0,
                o: 0
            },
            cy: {
                a: 0,
                e: 0,
                i: 0,
                l: 0,
                lp: 0,
                o: 0
            }
        },
        material: {
            //emissive: new Color(0xdddd33),
            color: '#ffff00',
        }
    },
    {
        id: 'mercury',
        name: 'Mercury',
        mass: 3.3022e23,
        radius: 2439,
        sideralDay: 58.646 * DAY,
        caption: "Swift Planet",
        description: "Mercury is the fastest and smallest planet in our solar system. On the surface, the Sun would appear 3 times as large as it does from Earth.",
        year: "88 Earth days",
        day: "59 Earth days",
        moons: 0,
        distanceFromSun: 0.4,
        minTemp: -170,
        maxTemp: 449,
        timesLarger: 0.38,
        orbitalVelocity: 47.9,
        orbit: {
            base: {
                a: 0.38709927 * AU,
                e: 0.20563593,
                i: 7.00497902,
                l: 252.25032350,
                lp: 77.45779628,
                o: 48.33076593
            },
            cy: {
                a: 0.00000037 * AU,
                e: 0.00001906,
                i: -0.00594749,
                l: 149472.67411175,
                lp: 0.16047689,
                o: -0.12534081
            }
        },
        material: {
            color: '#588a7b',
        }
    },
    {
        id: 'venus',
        name: 'Venus',
        mass: 4.868e24,
        radius: 6051,
        tilt: 177.4,
        sideralDay: 243.025 * DAY,
        caption: "Morning Star",
        description: "Venus is the hottest planet in our solar system. This is caused by its thick atmosphere which traps heat and causes greenhouse effect.",
        year: "225 Earth days",
        day: "243 Earth days",
        moons: 0,
        distanceFromSun: 0.7,
        meanTemp: 465,
        timesLarger: 0.9,
        orbit: {
            base: {
                a: 0.72333566 * AU,
                e: 0.00677672,
                i: 3.39467605,
                l: 181.97909950,
                lp: 131.60246718,
                o: 76.67984255
            },
            cy: {
                a: 0.00000390 * AU,
                e: -0.00004107,
                i: -0.00078890,
                l: 58517.81538729,
                lp: 0.00268329,
                o: -0.27769418
            }
        },
        material: {
            color: '#fda700',
        }
    },
    {
        id: 'earth',
        name: 'The Earth',
        mass: 5.9736e24,
        radius: 3443.9307 * NM_TO_KM,
        tilt: 23 + (26 / 60) + (21 / 3600),
        sideralDay: SIDERAL_DAY,
        caption: "Blue Planet",
        description: "Earth is the only planet in our solar system with liquid water on its surface. The atmosphere allows us humans to breathe, while it also protects us from meteoroids.",
        year: "365.25 Earth days",
        day: "23.9 hours",
        moons: 1,
        distanceFromSun: 1,
        minTemp: -89,
        maxTemp: 58,
        timesLarger: -1,
        atmosphere: {
            atmospherePressure: 101.325,
            components: [{
                id: 'N',
                name: 'Nitrogen',
                ratio: 78.08
            }, {
                id: 'O2',
                name: 'Oxygen',
                ratio: 20.95
            }, {
                id: 'Ar',
                name: 'Argon',
                ratio: 0.93
            }, {
                id: 'CO2',
                name: 'Carbon Dioxide',
                ratio: 0.038
            }, {
                id: 'etc',
                name: 'Etc',
                ratio: 0.002
            }]
        },
        orbit: {
            base: {
                a: 1.00000261 * AU,
                e: 0.01671123,
                i: -0.00001531,
                l: 100.46457166,
                lp: 102.93768193,
                o: 0.0
            },
            cy: {
                a: 0.00000562 * AU,
                e: -0.00004392,
                i: -0.01294668,
                l: 35999.37244981,
                lp: 0.32327364,
                o: 0.0
            }
        },
        material: {
            color: '#1f7cda',
        }
    },
    {
        id: 'mars',
        name: 'Mars',
        mass: 6.4185e23,
        radius: 3376,
        tilt: 25.19,
        sideralDay: 1.025957 * DAY,
        caption: "Red Planet",
        description: "Mars is our best candidate for living outside of Earth. It is the only planet we've sent rovers to. Perseverance rover's Mars samples should make it to Earth in 2033.",
        year: "1.88 Earth years",
        day: "24.6 hours",
        moons: 2,
        distanceFromSun: 1.5,
        minTemp: -125,
        maxTemp: 20,
        timesLarger: 0.52,
        atmosphere: {
            atmospherePressure: 0.636,
            components: [{
                id: 'CO2',
                name: 'Carbon Dioxide',
                ratio: 95.97
            }, {
                id: 'N',
                name: 'Nitrogen',
                ratio: 1.89
            }, {
                id: 'Ar',
                name: 'Argon',
                ratio: 1.93
            }, {
                id: 'O2',
                name: 'Oxygen',
                ratio: 0.146
            }, {
                id: 'etc',
                name: 'etc',
                ratio: 0.064
            }]
        },
        orbit: {
            base: {
                a: 1.52371034 * AU,
                e: 0.09339410,
                i: 1.84969142,
                l: -4.55343205,
                lp: -23.94362959,
                o: 49.55953891
            },
            cy: {
                a: 0.00001847 * AU,
                e: 0.00007882,
                i: -0.00813131,
                l: 19140.30268499,
                lp: 0.44441088,
                o: -0.29257343
            }
        },
        material: {
            color: '#ff3300',
        }
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        mass: 1.8986e27,
        radius: 71492,
        tilt: 3.13,
        sideralDay: (10 * HOUR) - ((HOUR / 60) * 5),
        caption: "Giant Planet",
        description: "Jupiter is the largest planet in our solar system. The Great Red Spot is Jupiter's super storm that is twice the size of Earth and has raged for more than 100 years.",
        year: "11.86 Earth years",
        day: "9.93 hours",
        moons: 79,
        distanceFromSun: 5.1,
        meanTemp: -110,
        timesLarger: 11,
        orbit: {
            base: {
                a: 5.20288700 * AU,
                e: 0.04838624,
                i: 1.30439695,
                l: 34.39644051,
                lp: 14.72847983,
                o: 100.47390909
            },
            cy: {
                a: -0.00011607 * AU,
                e: -0.00013253,
                i: -0.00183714,
                l: 3034.74612775,
                lp: 0.21252668,
                o: 0.20469106
            }
        },
        material: {
            color: '#ff9932',
        }
    },
    {
        id: 'saturn',
        name: 'Saturn',
        mass: 5.6846e26,
        radius: 58232,
        tilt: 26.7,
        sideralDay: (11 * HOUR) - ((HOUR / 60) * 10),
        caption: "Ringed Planet",
        description: "Saturn isn't the only ringed planet in our solar system, but none are as beautiful as Saturn's. Saturn has a total of 7 rings.",
        year: "29.45 Earth years",
        day: "10.7 hours",
        moons: 82,
        distanceFromSun: 9.5,
        meanTemp: -140,
        timesLarger: 9.1,
        ring: {
            innerRadius: 74500,
            outerRadius: 117580,
        },
        orbit: {
            base: {
                a: 9.53667594 * AU,
                e: 0.05386179,
                i: 2.48599187,
                l: 49.95424423,
                lp: 92.59887831,
                o: 113.66242448
            },
            cy: {
                a: -0.00125060 * AU,
                e: -0.00050991,
                i: 0.00193609,
                l: 1222.49362201,
                lp: -0.41897216,
                o: -0.28867794
            }
        },
        material: {
            color: '#ffcc99',
        }
    },
    {
        id: 'uranus',
        name: 'Uranus',
        mass: 8.6810e25,
        radius: 25559,
        tilt: 97.77,
        sideralDay: 17 * HOUR,
        caption: "Ice Giant",
        description: "Uranus is an icy gas giant. It is the only planet in our solar system that rotates on its side. Just like Venus, Uranus also rotates east to west.",
        year: "84 Earth years",
        day: "17 hours",
        moons: 27,
        distanceFromSun: 19.8,
        meanTemp: -195,
        timesLarger: 4,
        orbit: {
            base: {
                a: 19.18916464 * AU,
                e: 0.04725744,
                i: 0.77263783,
                l: 313.23810451,
                lp: 170.95427630,
                o: 74.01692503
            },
            cy: {
                a: -0.00196176 * AU,
                e: -0.00004397,
                i: -0.00242939,
                l: 428.48202785,
                lp: 0.40805281,
                o: 0.04240589
            }
        },
        material: {
            color: '#99ccff',
        }
    },
    {
        id: 'Neptune',
        name: 'neptune',
        mass: 1.0243e26,
        radius: 24764,
        tilt: 28.32,
        sideralDay: 16 * HOUR,
        caption: "Big Blue Planet",
        description: "Neptune is the only planet in our solar system not visible to the naked eye. NASA's Voyager 2 flew by Neptune in 1989 making it the only spacecraft to visit it up close.",
        year: "164 Earth years",
        day: "16 hours",
        moons: 14,
        distanceFromSun: 30.1,
        meanTemp: -200,
        timesLarger: 3.9,
        orbit: {
            base: {
                a: 30.06992276 * AU,
                e: 0.00859048,
                i: 1.77004347,
                l: -55.12002969,
                lp: 44.96476227,
                o: 131.78422574
            },
            cy: {
                a: 0.00026291 * AU,
                e: 0.00005105,
                i: 0.00035372,
                l: 218.45945325,
                lp: -0.32241464,
                o: -0.00508664
            }
        },
        material: {
            color: '#3299ff',
        }
    },
    {
        id: 'pluto',
        name: 'Pluto',
        mass: 1.305e22 + 1.52e21,
        radius: 1153,
        // tilt: 119.61,
        sideralDay: 6.38723 * DAY,
        orbit: {
            base: {
                a: 39.48211675 * AU,
                e: 0.24882730,
                i: 17.14001206,
                l: 238.92903833,
                lp: 224.06891629,
                o: 110.30393684
            },
            cy: {
                a: -0.00031596 * AU,
                e: 0.00005170,
                i: 0.00004818,
                l: 145.20780515,
                lp: -0.04062942,
                o: -0.01183482
            }
        },
        material: {
            color: '#aaaaaa',
        }
    }

];




