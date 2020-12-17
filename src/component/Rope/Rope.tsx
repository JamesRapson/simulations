import React, { useCallback, useEffect, useState } from "react";
import {
  simulationSpeeds,
  SpeedType,
} from "../ElasticCollisions/elasticCollisionsSimulator";
import { Simulation, Rope, Point, updateAllPoints } from "./ropeSimulation";

const simulation: Simulation = {
  ES: 0.1,
  gravity: 1,
  timeInterval: 0.01,
  size: 200,
};

const getRope = () => {
  return {
    points: [
      {
        mass: 0.1,
        position: { x: 100, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 5,
      },
      {
        mass: 0.1,
        position: { x: 110, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 5,
      },
      {
        mass: 0.1,
        position: { x: 120, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 5,
      },
      {
        mass: 0.1,
        position: { x: 130, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 5,
      },
      {
        mass: 0.1,
        position: { x: 140, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 5,
      },
      {
        mass: 0.1,
        position: { x: 150, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 5,
      },
      {
        mass: 0.1,
        position: { x: 160, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 5,
      },
      {
        mass: 0.1,
        position: { x: 170, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 5,
      },
    ],
  };
};

let rope = getRope();
const defaultSpeed = "Normal";
let timeInterval: number =
  simulationSpeeds.find((s) => s.speed === defaultSpeed)?.timeInterval || 0;

export const RopeCtrl = () => {
  const [, setCounter] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState<SpeedType>(
    defaultSpeed
  );

  const size = Math.min(window.innerHeight - 50, window.innerWidth - 200);
  const scaleFactor = size / simulation.size;

  const doSimulationTimeStepCB = useCallback(() => {
    updateAllPoints(rope, simulation, timeInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        doSimulationTimeStepCB();
        setCounter((count) => count + 1);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [running, doSimulationTimeStepCB]);

  const onSimulationSpeedChanged = (speedType: SpeedType) => {
    setSimulationSpeed(speedType);
    timeInterval =
      simulationSpeeds.find((s) => s.speed === speedType)?.timeInterval || 0;
    rope = getRope();
    setCounter((count) => count + 1);
  };

  const toggleStartStop = () => {
    setRunning((val) => !val);
    setCounter((prev) => prev + 1);
  };

  const resetSimulation = () => {
    rope = getRope();
    setCounter((count) => count + 1);
  };

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
        <svg key="simulation-border" width={size} height={size}>
          <g
            width={simulation.size}
            height={simulation.size}
            transform={`scale(${scaleFactor} ${scaleFactor})`}
          >
            {rope.points.map((point, index) => {
              return <PointCtrl point={point} key={index} />;
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

const PointCtrl = ({ point }: { point: Point }) => {
  return (
    <svg
      width={point.size * 2}
      height={point.size * 2}
      x={point.position.x - point.size}
      y={simulation.size - point.position.y - point.size}
    >
      <circle
        cx={point.size}
        cy={point.size}
        r={point.size - 1}
        style={{
          stroke: "black",
          strokeWidth: 1,
          opacity: 1,
        }}
      ></circle>
    </svg>
  );
};
