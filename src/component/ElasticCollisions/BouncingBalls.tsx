import React, { useCallback, useEffect, useState } from "react";
import { createRandonVector } from "../../vectors";
import { Ball, Environment } from "./elasticBall";
import {
  performCollisions,
  doBoundaries,
  updatePosition,
  SpeedType,
  simulationSpeeds,
} from "./elasticCollisionsSimulator";

const colors = [
  "purple",
  "red",
  "white",
  "blue",
  "black",
  "cyan",
  "orange",
  "green",
  "grey",
  "pink",
  "yellow",
  "MAROON",
  "Olive",
  "Teal",
];

const generateBalls = (count: number, environment: Environment) => {
  const balls: Ball[] = [];
  for (let i = 0; i < count; i++) {
    const size = Math.ceil(Math.random() * 40) + 10;
    const xPos =
      Math.ceil(Math.random() * (environment.width - 2 * size)) + size;
    const YPos =
      Math.ceil(Math.random() * (environment.height - 2 * size)) + size;
    balls.push({
      color: colors[i % colors.length],
      name: `ball ${i}`,
      position: { x: xPos, y: YPos },
      velocity: createRandonVector(120),
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

const defaultBallCount = 10;
const defaultSpeed = "Normal";
let balls = generateBalls(10, environment);
let timeInterval: number =
  simulationSpeeds.find((s) => s.speed === defaultSpeed)?.timeInterval || 0;

export const BouncingBalls = () => {
  const [, setCounter] = useState<number>(0);
  const [ballCount, setBallCount] = useState<number>(defaultBallCount);
  const [running, setRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState<SpeedType>(
    defaultSpeed
  );

  const margin = 50;
  const size = Math.min(window.innerHeight - 50, window.innerWidth - 200);
  const scale = (window.innerHeight - 2 * margin) / size;

  const doSimulationTimeStepCB = useCallback(() => {
    performCollisions(balls);
    balls.forEach((ball) => {
      doBoundaries(ball, environment);
      updatePosition(ball, environment, timeInterval);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        doSimulationTimeStepCB();
        setCounter((count) => count + 1);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [running, ballCount, doSimulationTimeStepCB]);

  const onCountOfBallsChanged = (countStr: string) => {
    const count = Number.parseInt(countStr);
    balls = generateBalls(count, environment);
    setBallCount(count);
  };

  const onSimulationSpeedChanged = (speedType: SpeedType) => {
    setSimulationSpeed(speedType);
    timeInterval =
      simulationSpeeds.find((s) => s.speed === speedType)?.timeInterval || 0;
    setCounter((count) => count + 1);
  };

  const toggleStartStop = () => {
    setRunning((val) => !val);
    setCounter((prev) => prev + 1);
  };

  const resetSimulation = () => {
    balls = generateBalls(ballCount, environment);
    setCounter((count) => count + 1);
  };

  //const energy = getTotalEnergy(balls, environment);
  //console.log("total energy", Math.ceil(energy));

  return (
    <div className="flex ml-6">
      <div className="m-1">
        <div className="m-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full"
            onClick={toggleStartStop}
          >
            {running ? "Stop" : "Run"}
          </button>
        </div>
        <div className="m-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full"
            onClick={resetSimulation}
          >
            Reset
          </button>
        </div>
        <div className="m-2">
          <div>Ball Count</div>
          <select
            className="border-2 px-4 py-1"
            onChange={(e) => onCountOfBallsChanged(e.currentTarget.value)}
            value={ballCount}
          >
            {[1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60].map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="m-2">
          <div>Simulation speed</div>
          <select
            className="border-2 px-4 py-1"
            onChange={(e) =>
              onSimulationSpeedChanged(e.currentTarget.value as SpeedType)
            }
            value={simulationSpeed}
          >
            {simulationSpeeds.map((s) => (
              <option value={s.speed}>{s.speed}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="m-1">
        <svg
          key="environment-border"
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <g
            width={environment.width}
            height={environment.height}
            transform={`scale(${scale} ${scale}) translate(${margin},${margin})`}
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
      </div>
    </div>
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
