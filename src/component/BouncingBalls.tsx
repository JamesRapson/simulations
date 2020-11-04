import React, { useCallback, useEffect, useState } from "react";
import {
  doBoundaries,
  performCollisions,
  updatePosition,
} from "../elasticCollisionsSimulator";
import { Ball, Environment } from "../model/elasticBall";
import { createRandonVector } from "../vectors";

const colors = [
  "pink",
  "purple",
  "red",
  "blue",
  "black",
  "cyan",
  "orange",
  "green",
  "grey",
  "white",
  "yellow",
  "OLIVE",
  "MAROON",
  "Olive",
  "Teal",
];

const generateBalls = (count: number, environment: Environment) => {
  const balls: Ball[] = [];
  for (let i = 0; i < count; i++) {
    const size = Math.ceil(Math.random() * 20) + 20;
    const xPos =
      Math.ceil(Math.random() * (environment.width - 2 * size)) + size;
    const YPos =
      Math.ceil(Math.random() * (environment.height - 2 * size)) + size;
    balls.push({
      color: colors[i % colors.length],
      name: `ball ${i}`,
      position: { x: xPos, y: YPos },
      velocity: createRandonVector(100),
      size: size,
      mass: 10,
    });
  }
  return balls;
};

const environment = {
  gravity: 10,
  height: 800,
  width: 1000,
};

const balls = generateBalls(20, environment);

export const BouncingBalls = () => {
  const [, setCounter] = useState<number>(0);

  const margin = 50;
  const scaleHeight = (window.innerHeight - 2 * margin) / environment.height;

  const doSimulationTimeStepCB = useCallback(() => {
    const interval = 0.04;
    performCollisions(balls);
    balls.forEach((ball) => {
      doBoundaries(ball, environment);
      updatePosition(ball, environment, interval);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      doSimulationTimeStepCB();
      setCounter((prev) => prev + 1);
    }, 10);
  }, [doSimulationTimeStepCB]);

  //const energy = getTotalEnergy(balls, environment);
  //console.log("total energy", Math.ceil(energy));

  return (
    <svg
      key="environment-border"
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <g
        width={environment.width}
        height={environment.height}
        transform={`scale(${scaleHeight} ${scaleHeight}) translate(${margin},${margin})`}
      >
        <rect
          key="environment"
          width={environment.width}
          height={environment.height}
          style={{
            fill: "silver",
            stroke: "black",
            strokeWidth: 2,
            opacity: 1,
          }}
        ></rect>

        {balls.map((ball, index) => {
          return <BallCtrl ball={ball} key={index} />;
        })}
      </g>
    </svg>
  );
};

const BallCtrl = ({ ball }: { ball: Ball }) => {
  return (
    <svg
      key={`ball-container${ball.name}`}
      width={ball.size * 2}
      height={ball.size * 2}
      x={ball.position.x - ball.size}
      y={environment.height - ball.position.y - ball.size}
    >
      <circle
        key={`ball${ball.name}`}
        cx={ball.size}
        cy={ball.size}
        r={ball.size - 1}
        style={{
          fill: ball.color,
          stroke: "black",
          strokeWidth: 1,
          opacity: 1,
        }}
      ></circle>
    </svg>
  );
};
