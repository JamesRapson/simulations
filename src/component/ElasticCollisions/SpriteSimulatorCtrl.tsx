import React, { useCallback, useEffect, useState } from "react";
import {
  doBoundaries,
  performCollisions,
  simulationSpeeds,
  SpeedType,
  updatePosition,
  updateRotation,
} from "./elasticCollisionsSimulator";
import {
  getSpriteRenderCtrl,
  Sprite,
  SpriteSimulatorCtrlProps,
  SpriteType,
} from "./model";

const environment = {
  gravity: 10,
  height: 1000,
  width: 1000,
};

const defaultspriteCount = 10;
const defaultSpeed = "Fast";
let timeInterval: number =
  simulationSpeeds.find((s) => s.speed === defaultSpeed)?.timeInterval || 0;

let sprites: Sprite[] = [];

export const SpriteSimulatorCtrl = ({
  spriteGenerator,
}: SpriteSimulatorCtrlProps) => {
  const [, setCounter] = useState<number>(0);
  const [spriteCount, setSpriteCount] = useState<number>(defaultspriteCount);
  const [running, setRunning] = useState(true);
  const [spriteType, setSpriteType] = useState<SpriteType>("Man");
  const [simulationSpeed, setSimulationSpeed] = useState<SpeedType>(
    defaultSpeed
  );

  const doSimulationTimeStepCB = useCallback(() => {
    performCollisions(sprites);
    sprites.forEach((sprite) => {
      doBoundaries(sprite, environment);
      updatePosition(sprite, environment, timeInterval);
      updateRotation(sprite, timeInterval);
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
  }, [running, spriteCount, doSimulationTimeStepCB]);

  useEffect(() => {
    sprites = spriteGenerator(spriteType, spriteCount, environment);
  }, [spriteCount, spriteType, spriteGenerator]);

  const onCountOfBallsChanged = (countStr: string) => {
    const count = Number.parseInt(countStr);
    setSpriteCount(count);
  };

  const onSimulationSpeedChanged = (speedType: SpeedType) => {
    setSimulationSpeed(speedType);
    timeInterval =
      simulationSpeeds.find((s) => s.speed === speedType)?.timeInterval || 0;
    setCounter((count) => count + 1);
  };

  const onSpriteTypeChanged = (type: string) => {
    const sType = type as SpriteType;
    setSpriteType(sType);
    sprites = spriteGenerator(sType, spriteCount, environment);
  };

  const toggleStartStop = () => {
    setRunning((val) => !val);
    setCounter((prev) => prev + 1);
  };

  const resetSimulation = () => {
    sprites = spriteGenerator(spriteType, spriteCount, environment);
    setCounter((count) => count + 1);
  };

  let areaHeight = 0,
    areaWidth = 0;
  if (window.innerWidth > 800) {
    // Horizontal layout
    areaHeight = window.innerHeight - 50;
    areaWidth = window.innerWidth - 300;
  } else {
    // vartical layout
    areaWidth = window.innerWidth - 50;
    areaHeight = areaWidth;
  }

  return (
    <div className="flex-container p-4">
      <div className="m-8 w-48">
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
          <div>Sprite Count</div>
          <select
            className="border-2 px-4 py-1"
            onChange={(e) => onCountOfBallsChanged(e.currentTarget.value)}
            value={spriteCount}
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
        <div className="m-2">
          <div>Sprite Type</div>
          <select
            className="border-2 px-4 py-1"
            onChange={(e) => onSpriteTypeChanged(e.currentTarget.value)}
            value={spriteType}
          >
            <option value="Man">C64 Man</option>
            <option value="Ball">Ball</option>
            <option value="Cat">Cat</option>
          </select>
        </div>
      </div>
      <div className="w-full">
        <svg
          key="environment-border"
          width={areaWidth}
          height={areaHeight}
          viewBox={`0 0 ${environment.width} ${environment.height}`}
        >
          <rect
            key="environment"
            width="100%"
            height="100%"
            style={{
              fill: "silver",
              stroke: "black",
              strokeWidth: 2,
              opacity: 1,
            }}
          ></rect>

          {sprites.map((sprite, index) => {
            const SpriteRenderCtrl = getSpriteRenderCtrl(sprite);
            return (
              <SpriteRenderCtrl
                sprite={sprite}
                key={index}
                environment={environment}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
