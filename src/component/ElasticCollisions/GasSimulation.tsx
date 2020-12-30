import React, { useCallback, useEffect, useState } from "react";
import { createRandonVector, scaleVector } from "../../vectors";
import { Environment, Sprite } from "./model";
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

const createSprites = (environment: Environment, size: number) => {
  const gap = 20;
  const spacing = 2 * size + gap;
  const rowCount = (environment.height - spacing) / spacing;
  const colCount = (environment.width - spacing) / spacing;

  const sprites: Sprite[] = [];
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      sprites.push({
        color: "white",
        size,
        mass: 0.2,
        name: `sprite ${row} ${col}`,
        position: {
          x: col * spacing + gap + size,
          y: row * spacing + gap + size,
        },
        velocity: createRandonVector(25),
        rotation: 0,
        rotationSpeed: 10,
        type: "Ball",
      });
    }
  }
  return sprites;
};

// simulate heating/cooling from below
const doHeatingCooling = (sprite: Sprite, heatType: HeatType) => {
  if (heatType === "Heat") {
    sprite.velocity = scaleVector(sprite.velocity, 1.3);
  } else if (heatType === "Cool") {
    sprite.velocity = scaleVector(sprite.velocity, 0.8);
  }
};

const doContainerBoundaries = (
  sprite: Sprite,
  environment: Environment,
  heatType: HeatType
) => {
  // lower boundary
  if (sprite.position.x - sprite.size < 0 && sprite.velocity.x < 0) {
    sprite.velocity.x = -1 * sprite.velocity.x;
    doHeatingCooling(sprite, heatType);
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

const defaulktSize = 10;
const defaultSpeed = "Normal";
let timeInterval: number =
  simulationSpeeds.find((s) => s.speed === defaultSpeed)?.timeInterval || 0;

let sprites = createSprites(environment, defaulktSize);

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
    performCollisions(sprites);
    sprites.forEach((sprite) => {
      doContainerBoundaries(sprite, environment, heatType);
      updatePosition(sprite, environment, timeInterval);
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
        const energy = getTotalEnergy(sprites, environment);
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
    sprites = createSprites(environment, 10);
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
        <SpritesCtrl sprites={sprites} heatType={heatType}></SpritesCtrl>
      </div>
      <div className="m-1">
        <div>Energy Histogram</div>
        <Histogram sprites={sprites} environment={environment}></Histogram>
      </div>
    </div>
  );
};

const SpritesCtrl = ({
  sprites,
  heatType,
}: {
  sprites: Sprite[];
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

        {sprites.map((sprite, index) => {
          return <SpriteCtrl sprite={sprite} index={index} />;
        })}
      </g>
    </svg>
  );
};

const SpriteCtrl = ({ sprite, index }: { sprite: Sprite; index: number }) => {
  return (
    <svg
      key={`sprite-container${sprite.name}`}
      width={sprite.size * 2}
      height={sprite.size * 2}
      x={sprite.position.x - sprite.size}
      y={environment.height - sprite.position.y - sprite.size}
    >
      <circle
        key={`sprite${index}`}
        cx={sprite.size}
        cy={sprite.size}
        r={sprite.size - 1}
        style={{
          fill: sprite.color,
          stroke: "black",
          strokeWidth: 1,
          opacity: 1,
        }}
      ></circle>
    </svg>
  );
};
