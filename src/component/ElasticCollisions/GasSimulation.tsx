import React, { useCallback, useEffect, useState } from "react";
import { createRandonVector, scaleVector } from "../../vectors";
import { Ball, Environment } from "./elasticBall";
import {
  performCollisions,
  getTotalEnergy,
  updatePosition,
  simulationSpeeds,
  SpeedType,
} from "./elasticCollisionsSimulator";

import { Histogram } from "./Histogram";

const environment = {
  gravity: 10,
  height: 800,
  width: 800,
};

const createBalls = (environment: Environment, size: number) => {
  const gap = 20;
  const spacing = 2 * size + gap;
  const rowCount = (environment.height - spacing) / spacing;
  const colCount = (environment.width - spacing) / spacing;

  const balls: Ball[] = [];
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      balls.push({
        color: "white",
        size,
        mass: 0.2,
        name: `ball ${row} ${col}`,
        position: {
          x: col * spacing + gap + size,
          y: row * spacing + gap + size,
        },
        velocity: createRandonVector(25),
      });
    }
  }
  return balls;
};

// simulate heating/cooling from below
const doHeatingCooling = (ball: Ball, heatType: HeatType) => {
  if (heatType === "Heat") {
    ball.velocity = scaleVector(ball.velocity, 1.3);
  } else if (heatType === "Cool") {
    ball.velocity = scaleVector(ball.velocity, 0.8);
  }
};

const doContainerBoundaries = (
  ball: Ball,
  environment: Environment,
  heatType: HeatType
) => {
  // lower boundary
  if (ball.position.x - ball.size < 0 && ball.velocity.x < 0) {
    ball.velocity.x = -1 * ball.velocity.x;
    doHeatingCooling(ball, heatType);
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

const defaulktSize = 10;
const defaultSpeed = "Normal";
let timeInterval: number =
  simulationSpeeds.find((s) => s.speed === defaultSpeed)?.timeInterval || 0;

let balls = createBalls(environment, defaulktSize);

type HeatType = "Heat" | "Cool" | "None";

export const GasSimulation = () => {
  const [, setCounter] = useState<number>(0);
  const [heatType, setHeatType] = useState<HeatType>("None");
  const [totalEnergy, setTotalEnergy] = useState<number>();
  const [running, setRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState<SpeedType>(
    defaultSpeed
  );

  const doSimulationTimeStepCB = useCallback(() => {
    performCollisions(balls);
    balls.forEach((ball) => {
      doContainerBoundaries(ball, environment, heatType);
      updatePosition(ball, environment, timeInterval);
    });
  }, [heatType]);

  const onHeatingChange = (type: string) => {
    setHeatType(type as HeatType);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        doSimulationTimeStepCB();
        setCounter((count) => count + 1);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [running, doSimulationTimeStepCB]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        const energy = getTotalEnergy(balls, environment);
        setTotalEnergy(Math.ceil(energy));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const toggleStartStop = () => {
    setRunning((val) => !val);
    setCounter((prev) => prev + 1);
  };

  const resetSimulation = () => {
    balls = createBalls(environment, 10);
    setCounter((count) => count + 1);
  };

  const onSimulationSpeedChanged = (speedType: SpeedType) => {
    setSimulationSpeed(speedType);
    timeInterval =
      simulationSpeeds.find((s) => s.speed === speedType)?.timeInterval || 0;
    setCounter((count) => count + 1);
  };

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
          <div>Scenario</div>
          <select
            className="border-2 px-4 py-1"
            onChange={(e) => onHeatingChange(e.currentTarget.value)}
          >
            <option value="None">None</option>
            <option value="Heat">Heat</option>
            <option value="Cool">Cool</option>
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

        <div className="m-2">
          <div>Total Energy : {totalEnergy}</div>
        </div>
      </div>
      <div className="m-1">
        <BallsCtrl balls={balls} heatType={heatType}></BallsCtrl>
      </div>
      <div className="m-1">
        <div>Energy Histogram</div>
        <Histogram balls={balls} environment={environment}></Histogram>
      </div>
    </div>
  );
};

const BallsCtrl = ({
  balls,
  heatType,
}: {
  balls: Ball[];
  heatType: HeatType;
}) => {
  const margin = 50;
  const scaleHeight = (window.innerHeight - 2 * margin) / environment.height;

  return (
    <svg
      key="environment-border"
      width={window.innerHeight}
      height={window.innerHeight}
    >
      <g
        width={environment.width}
        height={environment.height}
        transform={`scale(${scaleHeight} ${scaleHeight}) translate(${margin},1)`}
      >
        <rect
          key="environment"
          width={environment.width}
          height={environment.height + (heatType !== "None" ? 20 : 0)}
          style={{
            fill: "silver",
            stroke: "black",
            strokeWidth: 2,
            opacity: 1,
          }}
        ></rect>

        {heatType !== "None" && (
          <rect
            x="1"
            y={environment.height - 1}
            key="environment-heat"
            width={environment.width - 2}
            height="20"
            style={{
              fill: heatType === "Heat" ? "red" : "blue",
              stroke: "none",
              strokeWidth: 1,
              opacity: 1,
            }}
          ></rect>
        )}

        {balls.map((ball, index) => {
          return <BallCtrl ball={ball} index={index} />;
        })}
      </g>
    </svg>
  );
};

const BallCtrl = ({ ball, index }: { ball: Ball; index: number }) => {
  return (
    <svg
      key={`ball-container${ball.name}`}
      width={ball.size * 2}
      height={ball.size * 2}
      x={ball.position.x - ball.size}
      y={environment.height - ball.position.y - ball.size}
    >
      <circle
        key={`ball${index}`}
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
