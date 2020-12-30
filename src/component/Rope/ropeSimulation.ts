import {
  addVectors,
  convertToUnitVector,
  dotProduct,
  getMagnitude,
  scaleVector,
  subtractVectors,
} from "../../vectors";
import { Vector } from "../ElasticCollisions/model";

const neutralSeparation = 10;

export interface Point {
  position: Vector;
  velocity: Vector;
  mass: number;
  size: number;
}

export interface Rope {
  points: Point[];
}

export interface Simulation {
  gravity: number;
  timeInterval: number;
  ES: number;
  size: number;
}

export const updateAllPoints = (
  rope: Rope,
  simulation: Simulation,
  timeInterval: number
) => {
  for (let i = 0; i < rope.points.length; i++) {
    updatePoint(i, rope, simulation, timeInterval);
  }
};

export const updatePoint = (
  pointIndex: number,
  rope: Rope,
  simulation: Simulation,
  timeInterval: number
) => {
  if (pointIndex === 0) return; // start of rope is anchored
  //if (pointIndex === rope.points.length - 1) return; // end of rope is anchored

  let deltaV = { x: 0, y: 0 };
  const point = rope.points[pointIndex];

  const pointLS = pointIndex > 0 ? rope.points[pointIndex - 1] : undefined;
  const pointRS =
    pointIndex < rope.points.length - 1
      ? rope.points[pointIndex + 1]
      : undefined;

  // Calculate the velocity change due to point to left
  if (pointLS) {
    const forceLS = calculateForceVector(point, pointLS, simulation);
    const tempV = scaleVector(forceLS, (0.5 * timeInterval) / point.mass);
    deltaV = addVectors(deltaV, tempV);
  }

  // Add  the velocity change due to point to right
  if (pointRS) {
    const forceRS = calculateForceVector(point, pointRS, simulation);
    const tempV = scaleVector(forceRS, (0.5 * timeInterval) / point.mass);
    deltaV = addVectors(deltaV, tempV);
  }

  // velocity change due to gravity
  if (simulation.gravity > 0) {
    const gravityDeltaV = {
      x: 0,
      y: -1 * simulation.gravity * timeInterval,
    };

    const tempV = scaleVector(gravityDeltaV, 0.5 * timeInterval);
    deltaV = addVectors(deltaV, tempV);
  }

  point.velocity = addVectors(point.velocity, deltaV);

  point.position = addVectors(point.position, point.velocity);

  // update the points velocity with the delta V

  //if (pointLS) point.velocity = getPerpVector(point, pointLS, point.velocity);
};

const fixupDistance = (point: Point, point2: Point) => {
  const deltaPosition = subtractVectors(point2.position, point.position);
  const separation = getMagnitude(deltaPosition);
  const diff = separation - neutralSeparation;
  console.log(diff);

  const unitVector = convertToUnitVector(deltaPosition);
  point.position = addVectors(point.position, scaleVector(unitVector, diff));
};

const fixupVelcoity = (point: Point, point2: Point) => {
  const deltaPosition = subtractVectors(point2.position, point.position);
  const positionVector = convertToUnitVector(deltaPosition);
  const dotProd = dotProduct(positionVector, point.velocity);

  //  const diff = separation - neutralSeparation;
  // console.log(diff);

  //const unitVector = convertToUnitVector(deltaPosition);
  //point.position = addVectors(point.position, scaleVector(unitVector, diff));
};

//
const getPerpVector = (point: Point, point2: Point, vector: Vector): Vector => {
  const deltaPosition = subtractVectors(point2.position, point.position);
  const unitVector = convertToUnitVector(deltaPosition);
  //console.log("unitVector", unitVector.x, unitVector.y);

  const perpVector = { x: -1 * unitVector.y, y: unitVector.x };
  //console.log("perpVector", perpVector.x, perpVector.y);

  const dotProd = dotProduct(vector, perpVector);
  return scaleVector(perpVector, dotProd);
};

// Returns the force on point as a result of point2
const calculateForceVector = (
  point: Point,
  point2: Point,
  simulation: Simulation
): Vector => {
  const deltaPosition = subtractVectors(point2.position, point.position);
  const separation = getMagnitude(deltaPosition);
  const deltaPosUnitVector = convertToUnitVector(deltaPosition);

  return scaleVector(
    deltaPosUnitVector,
    (separation - neutralSeparation) * simulation.ES
  );
};
