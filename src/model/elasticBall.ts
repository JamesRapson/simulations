export interface Vector {
  x: number;
  y: number;
}

export interface Ball {
  color: string;
  size: number;
  mass: number;
  name: string;
  position: { x: number; y: number };
  velocity: Vector;
}

export interface Environment {
  gravity: number;
  width: number;
  height: number;
}

export interface Collision {
  ball1: Ball;
  ball2: Ball;
}
