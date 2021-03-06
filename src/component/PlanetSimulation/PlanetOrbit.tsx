import React, { useCallback, useEffect, useState } from "react";
import {
  simulationSpeeds,
  SpeedType,
} from "../ElasticCollisions/elasticCollisionsSimulator";
import { getScenario, Planet, ScenarioType, updatePosition } from "./planets";

const defaultScenario = "Scenario3";
const defaultSpeed = "Normal";
let timeInterval: number =
  simulationSpeeds.find((s) => s.speed === defaultSpeed)?.timeInterval || 0;
let scenario = getScenario(defaultScenario);

export const PlanetOrbit = () => {
  const [, setCounter] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [scenarioType, setScenarioType] = useState<ScenarioType>(
    defaultScenario
  );
  const [simulationSpeed, setSimulationSpeed] = useState<SpeedType>(
    defaultSpeed
  );

  const size = Math.min(window.innerHeight - 50, window.innerWidth - 200);
  const scaleFactor = size / scenario.size;

  const doSimulationTimeStepCB = useCallback(() => {
    scenario.planets.forEach((planet) => {
      updatePosition(planet, scenario.planets, timeInterval);
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
  }, [running, doSimulationTimeStepCB]);

  const onScenarioTypeChanged = (newScenarioType: ScenarioType) => {
    scenario = getScenario(newScenarioType);
    setScenarioType(newScenarioType);
  };

  const onSimulationSpeedChanged = (speedType: SpeedType) => {
    setSimulationSpeed(speedType);
    timeInterval =
      simulationSpeeds.find((s) => s.speed === speedType)?.timeInterval || 0;
  };

  const toggleStartStop = () => {
    setRunning((val) => !val);
  };

  const resetSimulation = () => {
    scenario = getScenario(scenarioType);
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
          <div>Scenario</div>
          <select
            className="border-2 px-4 py-1"
            onChange={(e) =>
              onScenarioTypeChanged(e.currentTarget.value as ScenarioType)
            }
          >
            <option value="Scenario1">Scenario 1</option>
            <option value="Scenario2">Scenario 2</option>
            <option value="Scenario3">Scenario 3</option>
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
        <svg key="environment-border" width={size} height={size}>
          <g
            width={scenario.size}
            height={scenario.size}
            transform={`scale(${scaleFactor} ${scaleFactor})`}
          >
            {scenario.planets.map((planet, index) => {
              return <PlanetCtrl planet={planet} key={index} />;
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

const PlanetCtrl = ({ planet }: { planet: Planet }) => {
  return (
    <svg
      key={`planet-container${planet.name}`}
      width={planet.size * 2}
      height={planet.size * 2}
      x={planet.position.x - planet.size}
      y={scenario.size - planet.position.y - planet.size}
    >
      <circle
        key={`planet${planet.name}`}
        cx={planet.size}
        cy={planet.size}
        r={planet.size - 1}
        style={{
          fill: planet.color,
          stroke: "black",
          strokeWidth: 1,
          opacity: 1,
        }}
      ></circle>
    </svg>
  );
};
