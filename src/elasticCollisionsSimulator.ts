import { Ball, Collision, Environment, Vector } from "./model/elasticBall";
import {
  subtractVectors,
  getAngle,
  dotProduct,
  scaleVector,
  getMagnitude,
} from "./vectors";

export const doBoundaries = (ball: Ball, environment: Environment) => {
  if (ball.position.x - ball.size < 0 && ball.velocity.x < 0) {
    ball.velocity.x = -1 * ball.velocity.x;
  }

  if (ball.position.x + ball.size > environment.width && ball.velocity.x > 0) {
    ball.velocity.x = -1 * ball.velocity.x;
  }

  if (ball.position.y + ball.size > environment.height) {
    ball.velocity.y = -1 * Math.abs(ball.velocity.y);
  }

  if (ball.position.y - ball.size < 0) {
    ball.velocity.y = Math.abs(ball.velocity.y);
  }
};

export const updatePosition = (
  ball: Ball,
  environment: Environment,
  timeInterval: number
) => {
  const deltaVelocity = -1 * environment.gravity * timeInterval;
  ball.position.x += ball.velocity.x * timeInterval;
  ball.position.y += (ball.velocity.y + 0.5 * deltaVelocity) * timeInterval;
  ball.velocity.y += deltaVelocity;
};

const getCollisions = (balls: Ball[]): Collision[] => {
  const collisions: Collision[] = [];
  for (let i = 0; i < balls.length; i++) {
    const ball1 = balls[i];

    for (let j = i + 1; j < balls.length; j++) {
      //if (i === j) continue;

      const ball2 = balls[j];

      const deltaX = ball1.position.x - ball2.position.x;
      const deltaY = ball1.position.y - ball2.position.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance <= ball1.size + ball2.size)
        collisions.push({ ball1, ball2 });
    }
  }
  return collisions;
};

export const performCollisions = (balls: Ball[]) => {
  const collisions = getCollisions(balls);

  if (collisions.length === 0) return;

  //const collisionBalls: Ball[] = [];
  for (const collision of collisions) {
    const ball1 = collision.ball1;
    const ball2 = collision.ball2;

    // Ensure that we only process a single collision for a ball
    //if (collisionBalls.indexOf(ball1) > -1) continue;
    //if (collisionBalls.indexOf(ball2) > -1) continue;
    //collisionBalls.push(ball1);
    //collisionBalls.push(ball2);

    const v1Final = getNewVelocityVectory(ball1, ball2);
    const v2Final = getNewVelocityVectory(ball2, ball1);
    if (v1Final) ball1.velocity = v1Final;
    if (v2Final) ball2.velocity = v2Final;

    /*
      const forceAngle = getAngle(ball1.position, ball2.position);
      const reverseForceAngle = 3.14159 + forceAngle;

      ball2.velocity.x = Math.cos(forceAngle) * 80;
      ball2.velocity.y = Math.sin(forceAngle) * 80;

      ball1.velocity.x = Math.cos(reverseForceAngle) * 80;
      ball1.velocity.y = Math.sin(reverseForceAngle) * 80;
      */
  }
};

const getNewVelocityVectory = (ball1: Ball, ball2: Ball): Vector | null => {
  const deltaVelecity = subtractVectors(ball1.velocity, ball2.velocity);
  const deltaPosition = subtractVectors(ball1.position, ball2.position);

  const angle = getAngle(deltaPosition, deltaVelecity);

  if (angle < 1.5708) {
    // quirk of discreet step simulation. This is a collision where the balls are moving away from each other
    return null;
  }
  const distance = getMagnitude(deltaPosition);
  const dotProd = dotProduct(deltaVelecity, deltaPosition);

  const numerator = 2 * ball2.mass * dotProd;
  const denominator = (ball1.mass + ball2.mass) * (distance * distance);

  const tempVector = scaleVector(deltaPosition, numerator / denominator);
  const result = subtractVectors(ball1.velocity, tempVector);
  return result;
};

const getStats = (balls: Ball[]): { average: number; medium: number } => {
  const data = balls.map((b) => getMagnitude(b.velocity));

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

export const getTotalEnergy = (balls: Ball[], environment: Environment) => {
  return getEnergy(balls, environment).reduce<number>(
    (acc, energy) => acc + energy,
    0
  );
};

export const getEnergy = (balls: Ball[], environment: Environment) => {
  return balls.map<number>((ball) => {
    const v = getMagnitude(ball.velocity);
    const ke = 0.5 * ball.mass * v * v;
    const pe = ball.mass * environment.gravity * ball.position.y;
    return ke + pe;
  });
};
