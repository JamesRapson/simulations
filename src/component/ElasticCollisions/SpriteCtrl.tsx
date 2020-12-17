import React from "react";
import { Ball } from "./elasticBall";

export const SpriteCtrl = ({ ball }: { ball: Ball }) => {
  return (
    <svg>
      <line
        x1="0"
        y1="0"
        x2="200"
        y2="200"
        style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }}
      />
    </svg>
  );
};
