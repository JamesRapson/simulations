import { Vector } from "../../model/elasticBall";
import {
  scaleVector,
  addVectors,
  convertToUnitVector,
  getMagnitude,
  subtractVectors,
} from "../../vectors";

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

export type ScenarioType = "Scenario1" | "Scenario2";

export const getScenario = (scenarioType: ScenarioType): Scenario => {
  if (scenarioType === "Scenario1") return getScenario1();
  return getScenario2();
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
    if (distance == 0) continue;
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
