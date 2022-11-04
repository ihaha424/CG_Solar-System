import { StarSystemData } from '../lib/systems/StarSystem';
import { PlanetSystemData } from '../lib/systems/PlanetSystem';
import {
    SUN, MERCURY, VENUS, EARTH, MARS,
    JUPITER, SATURN, URANUS, NEPTUNE, PLUTO
} from './planets.constant';
import { DEFAULT_CALC_PER_TICK, MONTH_PER_SECOND } from '../constants';

export interface ScenarioData {
    name: string;
    id: string;
    system: StarSystemData|PlanetSystemData,
    startDate: Date,
    secondsPerTick: number,
    calcPerTick: number
};

export const SolarSystem = {
    id: 'solarSystemScene',
    name: 'Solar System',
    system: {
        id: 'solarSystem',
        name: 'Solar System',
        type: 'starsystem',
        star: SUN,
        planets: [ MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO ]
    },
    startDate: new Date(),
    secondsPerTick: MONTH_PER_SECOND,
    calcPerTick: DEFAULT_CALC_PER_TICK
};
