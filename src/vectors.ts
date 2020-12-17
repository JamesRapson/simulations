import { Vector } from "./component/ElasticCollisions/elasticBall";

export const getAngle = (vector1: Vector, vector2: Vector) => {
  const lengthV1 = getMagnitude(vector1);
  const lengthV2 = getMagnitude(vector2);
  const temp = dotProduct(vector1, vector2) / (lengthV1 * lengthV2);
  return Math.acos(temp);
};

export const getMagnitude = (vector: Vector) => {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

export const addVectors = (vector1: Vector, vector2: Vector): Vector => {
  return { x: vector1.x + vector2.x, y: vector1.y + vector2.y };
};

export const subtractVectors = (vector1: Vector, vector2: Vector): Vector => {
  return { x: vector1.x - vector2.x, y: vector1.y - vector2.y };
};

export const dotProduct = (vector1: Vector, vector2: Vector): number => {
  return vector1.x * vector2.x + vector1.y * vector2.y;
};

export const scaleVector = (vector1: Vector, scale: number): Vector => {
  return { x: vector1.x * scale, y: vector1.y * scale };
};

export const createRandonVector = (magnitude: number) => {
  return {
    x: (Math.random() - 0.5) * magnitude,
    y: (Math.random() - 0.5) * magnitude,
  };
};

export const convertToUnitVector = (vector: Vector): Vector => {
  const magnitude = getMagnitude(vector);
  if (magnitude === 0) return { x: 0, y: 0 };
  return { x: vector.x / magnitude, y: vector.y / magnitude };
};
