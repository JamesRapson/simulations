import {
  ManSpriteRenderCtrl,
  CatSpriteRenderCtrl,
  BallSpriteRenderCtrl,
} from "./SpriteCtrl";

export interface Vector {
  x: number;
  y: number;
}

export type SpriteType = "Man" | "Ball" | "Cat";

export interface Sprite {
  color: string;
  size: number;
  mass: number;
  name: string;
  position: { x: number; y: number };
  velocity: Vector;
  rotation: number;
  rotationSpeed: number;
  type: SpriteType;
}

export interface Environment {
  gravity: number;
  width: number;
  height: number;
}

export interface Collision {
  sprite1: Sprite;
  sprite2: Sprite;
}

export type SpriteCtrlProps = {
  sprite: Sprite;
  environment: Environment;
};

export type SpriteRenderCtrl = (props: SpriteCtrlProps) => JSX.Element;

export type SpriteGenerator = (
  spriteType: SpriteType,
  count: number,
  environment: Environment
) => Sprite[];

export type SpriteSimulatorCtrlProps = {
  spriteGenerator: SpriteGenerator;
};

export const getSpriteRenderCtrl = (sprite: Sprite) => {
  switch (sprite.type) {
    case "Man":
      return ManSpriteRenderCtrl;
    case "Cat":
      return CatSpriteRenderCtrl;
    default:
      return BallSpriteRenderCtrl;
  }
};
