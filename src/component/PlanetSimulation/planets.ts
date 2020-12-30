import {
  scaleVector,
  addVectors,
  convertToUnitVector,
  getMagnitude,
  subtractVectors,
} from "../../vectors";
import { Vector } from "../ElasticCollisions/model";

export interface Planet {
  color: string;
  size: number;
  mass: number;
  name: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
}

export interface Scenario {
  planets: Planet[];
  name: string;
  size: number;
}

export type ScenarioType = "Scenario1" | "Scenario2" | "Scenario3";

export const getScenario = (scenarioType: ScenarioType): Scenario => {
  if (scenarioType === "Scenario1") return getScenario1();
  if (scenarioType === "Scenario2") return getScenario2();
  if (scenarioType === "Scenario3") return getScenario3();
  throw Error("Unknown scenario");
};

const getScenario1 = (): Scenario => {
  return {
    planets: [
      {
        color: "yellow",
        size: 50,
        mass: 1000000,
        name: "Sun",
        position: { x: 500, y: 500 },
        velocity: { x: 0, y: 0 },
      },
      {
        color: "red",
        size: 30,
        mass: 30,
        name: "Planet 1",
        position: { x: 500, y: 1000 },
        velocity: { x: 40, y: 0 },
      },
      {
        color: "blue",
        size: 10,
        mass: 10,
        name: "Planet 2",
        position: { x: 500, y: 100 },
        velocity: { x: -40, y: 0 },
      },
    ],
    name: "Scenario1",
    size: 1000,
  };
};

const getScenario2 = (): Scenario => {
  return {
    planets: [
      {
        color: "yellow",
        size: 50,
        mass: 1000000,
        name: "Sun",
        position: { x: 500, y: 500 },
        velocity: { x: 0, y: 0 },
      },
      {
        color: "red",
        size: 10,
        mass: 10000,
        name: "Planet 1",
        position: { x: 500, y: 120 },
        velocity: { x: 60, y: 0 },
      },
      {
        color: "blue",
        size: 10,
        mass: 10000,
        name: "Planet 2",
        position: { x: 500, y: 60 },
        velocity: { x: 40, y: 0 },
      },
    ],
    name: "Scenario2",
    size: 1000,
  };
};

const getScenario3 = (): Scenario => {
  const centre: Vector = { x: 1000, y: 1000 };
  return {
    planets: [
      {
        color: "yellow",
        size: 50,
        mass: 1000000,
        name: "Sun",
        position: centre,
        velocity: { x: 0, y: 0 },
      },
      {
        color: "grey",
        size: 5,
        mass: 5,
        name: "Mercury",
        position: { x: centre.x, y: centre.y + 100 },
        velocity: { x: 95, y: 0 },
      },
      {
        color: "silver",
        size: 15,
        mass: 5,
        name: "Venus",
        position: { x: centre.x, y: centre.y + 150 },
        velocity: { x: 85, y: 0 },
      },
      {
        color: "blue",
        size: 15,
        mass: 5,
        name: "Earth",
        position: { x: centre.x, y: centre.y + 200 },
        velocity: { x: 75, y: 0 },
      },
      {
        color: "red",
        size: 12,
        mass: 5,
        name: "Mars",
        position: { x: centre.x, y: centre.y + 250 },
        velocity: { x: 65, y: 0 },
      },
      {
        color: "orange",
        size: 40,
        mass: 5,
        name: "Jupiter",
        position: { x: centre.x, y: centre.y + 350 },
        velocity: { x: 55, y: 0 },
      },
      {
        color: "OLIVE",
        size: 35,
        mass: 5,
        name: "Saturn",
        position: { x: centre.x, y: centre.y + 450 },
        velocity: { x: 50, y: 0 },
      },
      {
        color: "TEAL",
        size: 25,
        mass: 5,
        name: "Neptune",
        position: { x: centre.x, y: centre.y + 550 },
        velocity: { x: 45, y: 0 },
      },
      {
        color: "green",
        size: 25,
        mass: 5,
        name: "Uranus",
        position: { x: centre.x, y: centre.y + 650 },
        velocity: { x: 40, y: 0 },
      },
    ],
    name: "Scenario3",
    size: 1700,
  };
};

export const getGravityDeltaV = (
  planet: Planet,
  planets: Planet[],
  timeInterval: number
): Vector => {
  let deltaV: Vector = { x: 0, y: 0 };
  for (let i = 0; i < planets.length; i++) {
    const planet1 = planets[i];
    if (planet1 === planet) continue;

    const diffVect = subtractVectors(planet1.position, planet.position);

    const distance = getMagnitude(diffVect);
    if (distance === 0) continue;
    const unitVect = convertToUnitVector(diffVect);
    const forceOfGravity = (planet.mass * planet1.mass) / (distance * distance);
    const gravityDeltaV = scaleVector(
      unitVect,
      (forceOfGravity * timeInterval) / planet.mass
    );
    deltaV = addVectors(deltaV, gravityDeltaV);
  }
  return deltaV;
};

export const updatePosition = (
  planet: Planet,
  planets: Planet[],
  timeInterval: number
) => {
  // Calculate the delta velocity due to gravity of other planets
  const deltaVelocity = getGravityDeltaV(planet, planets, timeInterval);

  // Calculate change in position due to planets velocity
  const deltaPos1 = scaleVector(planet.velocity, timeInterval);
  planet.position = addVectors(planet.position, deltaPos1);

  // calculate change in position due to gravity
  const deltaPos2 = scaleVector(deltaVelocity, timeInterval);
  planet.position = addVectors(planet.position, deltaPos2);

  // update planet's velocity due to gravity
  planet.velocity = addVectors(planet.velocity, deltaVelocity);
};
