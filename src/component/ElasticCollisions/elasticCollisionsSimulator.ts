import {
  subtractVectors,
  getAngle,
  dotProduct,
  scaleVector,
  getMagnitude,
} from "../../vectors";
import { Sprite, Environment, Collision, Vector } from "./model";

export type SpeedType =
  | "Very Slow"
  | "Slow"
  | "Normal"
  | "Fast"
  | "Very Fast"
  | "Flat Out";

export interface SpeedMapType {
  speed: SpeedType;
  timeInterval: number;
}

export const simulationSpeeds: SpeedMapType[] = [
  {
    speed: "Very Slow",
    timeInterval: 0.01,
  },
  {
    speed: "Slow",
    timeInterval: 0.02,
  },
  {
    speed: "Normal",
    timeInterval: 0.03,
  },
  {
    speed: "Fast",
    timeInterval: 0.04,
  },
  {
    speed: "Very Fast",
    timeInterval: 0.05,
  },
  {
    speed: "Flat Out",
    timeInterval: 0.07,
  },
];

export const doBoundaries = (sprite: Sprite, environment: Environment) => {
  if (sprite.position.x - sprite.size < 0 && sprite.velocity.x < 0) {
    sprite.velocity.x = -1 * sprite.velocity.x;
  }

  if (
    sprite.position.x + sprite.size > environment.width &&
    sprite.velocity.x > 0
  ) {
    sprite.velocity.x = -1 * sprite.velocity.x;
  }

  if (sprite.position.y + sprite.size > environment.height) {
    sprite.velocity.y = -1 * Math.abs(sprite.velocity.y);
  }

  if (sprite.position.y - sprite.size < 0) {
    sprite.velocity.y = Math.abs(sprite.velocity.y);
  }
};

export const updatePosition = (
  sprite: Sprite,
  environment: Environment,
  timeInterval: number
) => {
  const deltaVelocity = -1 * environment.gravity * timeInterval;
  sprite.position.x += sprite.velocity.x * timeInterval;
  sprite.position.y += (sprite.velocity.y + 0.5 * deltaVelocity) * timeInterval;
  sprite.velocity.y += deltaVelocity;
};

export const updateRotation = (sprite: Sprite, timeInterval: number) => {
  sprite.rotation += sprite.rotationSpeed * timeInterval;
};

const getCollisions = (sprites: Sprite[]): Collision[] => {
  const collisions: Collision[] = [];
  for (let i = 0; i < sprites.length; i++) {
    const sprite1 = sprites[i];

    for (let j = i + 1; j < sprites.length; j++) {
      //if (i === j) continue;

      const sprite2 = sprites[j];

      const deltaX = sprite1.position.x - sprite2.position.x;
      const deltaY = sprite1.position.y - sprite2.position.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance <= sprite1.size + sprite2.size)
        collisions.push({ sprite1: sprite1, sprite2: sprite2 });
    }
  }
  return collisions;
};

export const performCollisions = (sprites: Sprite[]) => {
  const collisions = getCollisions(sprites);

  if (collisions.length === 0) return;

  //const collisionSprites: Sprite[] = [];
  for (const collision of collisions) {
    const sprite1 = collision.sprite1;
    const sprite2 = collision.sprite2;

    // Ensure that we only process a single collision for a sprite
    //if (collisionSprites.indexOf(sprite1) > -1) continue;
    //if (collisionSprites.indexOf(sprite2) > -1) continue;
    //collisionSprites.push(sprite1);
    //collisionSprites.push(sprite2);

    const v1Final = getNewVelocityVectory(sprite1, sprite2);
    const v2Final = getNewVelocityVectory(sprite2, sprite1);
    if (v1Final) sprite1.velocity = v1Final;
    if (v2Final) sprite2.velocity = v2Final;

    /*
      const forceAngle = getAngle(sprite1.position, sprite2.position);
      const reverseForceAngle = 3.14159 + forceAngle;

      sprite2.velocity.x = Math.cos(forceAngle) * 80;
      sprite2.velocity.y = Math.sin(forceAngle) * 80;

      sprite1.velocity.x = Math.cos(reverseForceAngle) * 80;
      sprite1.velocity.y = Math.sin(reverseForceAngle) * 80;
      */
  }
};

const getNewVelocityVectory = (
  sprite1: Sprite,
  sprite2: Sprite
): Vector | null => {
  const deltaVelecity = subtractVectors(sprite1.velocity, sprite2.velocity);
  const deltaPosition = subtractVectors(sprite1.position, sprite2.position);

  const angle = getAngle(deltaPosition, deltaVelecity);

  if (angle < 1.5708) {
    // quirk of discreet step simulation. This is a collision where the sprites are moving away from each other
    return null;
  }
  const distance = getMagnitude(deltaPosition);
  const dotProd = dotProduct(deltaVelecity, deltaPosition);

  const numerator = 2 * sprite2.mass * dotProd;
  const denominator = (sprite1.mass + sprite2.mass) * (distance * distance);

  const tempVector = scaleVector(deltaPosition, numerator / denominator);
  const result = subtractVectors(sprite1.velocity, tempVector);
  return result;
};

const getStats = (sprites: Sprite[]): { average: number; medium: number } => {
  const data = sprites.map((b) => getMagnitude(b.velocity));

  let average = data.reduce<number>((acc, val) => acc + val, 0);
  average = average / data.length;

  const dataSort = data.sort();
  const mid = Math.ceil(data.length / 2);
  const medium =
    data.length % 2 === 0
      ? (dataSort[mid] + dataSort[mid - 1]) / 2
      : dataSort[mid - 1];

  return { average, medium };
};

export const getTotalEnergy = (sprites: Sprite[], environment: Environment) => {
  return getEnergy(sprites, environment).reduce<number>(
    (acc, energy) => acc + energy,
    0
  );
};

export const getEnergy = (sprites: Sprite[], environment: Environment) => {
  return sprites.map<number>((sprite) => {
    const v = getMagnitude(sprite.velocity);
    const ke = 0.5 * sprite.mass * v * v;
    const pe = sprite.mass * environment.gravity * sprite.position.y;
    return ke + pe;
  });
};
