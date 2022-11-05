import { AU, SIDERAL_DAY, NM_TO_KM, DAY, HOUR } from './index.js';
//import { Color } from '../../node_modules/three';
//const TEX_DIR = 'static/images/surface/';

export const PLANETS=[
    {
        id: 'sun',
        name: '태양',
        mass: 1.9891e30,
        radius: 6.96342e5,
        sideralDay: 25.6 * DAY,
        k: 0.01720209895,
        caption: "Yellow dwarf star",
        description: "태양은 우리 태양계의 중심이자 지구 생명의 원천입니다. 태양의 중심부의 온도는 약 1,500만 °C (2,700만 °F)입니다.",
        year: "230 milion Earth years",
        day: null,
        distanceFromSun:0,
        radius: 695508,
        meanTemp: 5500,
        timesLarger: 109.2,
        moons: 0,
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
        name: '수성',
        mass: 3.3022e23,
        radius: 2439,
        sideralDay: 58.646 * DAY,
        caption: "Swift Planet",
        description: "수성은 태양계에서 가장 빠르고 작은 행성입니다.수성의 표면에서 태양은 지구에서보다 3배 더 크게 나타납니다",
        year: "88 Earth days",
        day: "59 Earth days",
        moons: 0,
        distanceFromSun: 0.4,
        minTemp: -170,
        maxTemp: 449,
        meanTemp: 140,
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
        name: '금성',
        mass: 4.868e24,
        radius: 6051,
        tilt: 177.4,
        sideralDay: 243.025 * DAY,
        caption: "Morning Star",
        description: "금성은 태양계에서 가장 뜨거운 행성입니다. 이것은 열을 가두어 온실 효과를 만드는 두꺼운 대기 때문에 발생합니다..",
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
        name: '지구',
        mass: 5.9736e24,
        radius: 3443.9307 * NM_TO_KM,
        tilt: 23 + (26 / 60) + (21 / 3600),
        sideralDay: SIDERAL_DAY,
        caption: "Blue Planet",
        description: "지구는 우리 태양계에서 표면에 액체 상태의 물이 있는 유일한 행성입니다. 대기는 또한 유성체로부터 우리를 보호하면서, 우리 인간이 숨을 쉴 수 있게 해줍니다.",
        year: "365.25 Earth days",
        day: "23.9 hours",
        moons: 1,
        distanceFromSun: 1,
        minTemp: -89,
        maxTemp: 58,
        meanTemp: 15,
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
        name: '화성',
        mass: 6.4185e23,
        radius: 3376,
        tilt: 25.19,
        sideralDay: 1.025957 * DAY,
        caption: "Red Planet",
        description: "화성은 지구 밖에서 살기에 가장 좋은 후보입니다. 우리가 탐사선을 보낸 유일한 행성입니다. 인내 탐사선의 화성 샘플은 2033년에 지구에 도착할 것입니다.",
        year: "1.88 Earth years",
        day: "24.6 hours",
        moons: 2,
        distanceFromSun: 1.5,
        minTemp: -125,
        maxTemp: 20,
        meanTemp: -63,
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
        name: '목성',
        mass: 1.8986e27,
        radius: 71492,
        tilt: 3.13,
        sideralDay: (10 * HOUR) - ((HOUR / 60) * 5),
        caption: "Giant Planet",
        description: "목성은 태양계에서 가장 큰 행성입니다. 목성의 가장 큰 특징인 대적점은 지구의 두 배 크기이고 100년 이상 지속된 목성의 거대한 폭풍입니다.",
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
        name: '토성',
        mass: 5.6846e26,
        radius: 58232,
        tilt: 26.7,
        sideralDay: (11 * HOUR) - ((HOUR / 60) * 10),
        caption: "Ringed Planet",
        description: "토성이 우리 태양계에서 고리 모양의 유일한 행성은 아니지만, 토성만큼 아름다운 행성은 없습니다. 토성은 총 7개의 고리를 가지고 있습니다.",
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
        name: '천왕성',
        mass: 8.6810e25,
        radius: 25559,
        tilt: 97.77,
        sideralDay: 17 * HOUR,
        caption: "Ice Giant",
        description: "천왕성은 얼음처럼 차가운 가스 행성입니다. 그것은 우리 태양계에서 옆으로 회전하는 유일한 행성입니다. 금성처럼 천왕성 또한 동쪽에서 서쪽으로 회전합니다.",
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
        name: '해왕성',
        mass: 1.0243e26,
        radius: 24764,
        tilt: 28.32,
        sideralDay: 16 * HOUR,
        caption: "Big Blue Planet",
        description: "해왕성은 우리 태양계에서 육안으로 보이지 않는 유일한 행성입니다. 나사의 보이저 2호는 1989년에 해왕성을 지나쳐 가까이에서 방문한 유일한 우주선이 되었습니다.",
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
        name: '명왕성',
        mass: 1.305e22 + 1.52e21,
        radius: 1153,
        // tilt: 119.61,
        sideralDay: 6.38723 * DAY,
        caption: "Big Blue Planet",
        description: "명왕성은 태양계의 왜행성 중 하나이며 최초로 발견된 카이퍼 벨트 천체이다. 2015년 10월 기준 크기가 확인된 해왕성 바깥 천체 가운데에서 가장 큰 천체이다. 1930년 2월 18일 미국의 천문학자 클라이드 톰보가 발견한 이래 2006년 행성의 기준이 수정되기 전까지 태양계의 아홉 번째 행성으로 인식되었다.",
        year: "247 Earth years",
        day: "6.3 Earth days",
        moons: 5,
        distanceFromSun: 32.6,
        meanTemp: -248,
        timesLarger: 0.2,
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




