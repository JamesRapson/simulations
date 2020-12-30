import React from "react";
import { createRandonVector } from "../../vectors";
import { Environment, Sprite, SpriteType } from "./model";
import { SpriteSimulatorCtrl } from "./SpriteSimulatorCtrl";

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
  "yellow",
  "MAROON",
  "Olive",
  "Teal",
];

const generateSprites = (
  spriteType: SpriteType,
  count: number,
  environment: Environment
) => {
  const sprites: Sprite[] = [];
  for (let i = 0; i < count; i++) {
    const size = Math.ceil(Math.random() * 40) + 20;
    const xPos =
      Math.ceil(Math.random() * (environment.width - 2 * size)) + size;
    const YPos =
      Math.ceil(Math.random() * (environment.height - 2 * size)) + size;
    sprites.push({
      type: spriteType,
      color: colors[i % colors.length],
      name: `sprite ${i}`,
      position: { x: xPos, y: YPos },
      velocity: createRandonVector(120),
      size: size,
      mass: 10,
      rotation: 0,
      rotationSpeed: Math.ceil(Math.random() * 40) - 40,
    });
  }
  return sprites;
};

export const BouncingSprites = () => {
  return <SpriteSimulatorCtrl spriteGenerator={generateSprites} />;
};
