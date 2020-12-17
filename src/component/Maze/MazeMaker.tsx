import React, { useCallback, useEffect, useState } from "react";
import { Board } from "./maze";

const board: Board = {
  gridHeight: 100,
  gridWidth: 100,
  grid: [[true], [true]],
};

export const MazeMaker = () => {
  const [, setCounter] = useState<number>(0);

  const margin = 50;
  const size = Math.min(window.innerHeight - 50, window.innerWidth - 200);
  const scaleHeight = (window.innerHeight - 2 * margin) / size;

  return (
    <div className="m-1">
      <svg
        key="maze-border"
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <g
          width={board.gridWidth}
          height={board.gridHeight}
          transform={`scale(${scaleHeight} ${scaleHeight}) translate(${margin},${margin})`}
        >
          <rect
            key="maze-board"
            width={board.gridWidth}
            height={board.gridHeight}
            style={{
              fill: "silver",
              stroke: "black",
              strokeWidth: 2,
              opacity: 1,
            }}
          ></rect>
        </g>
      </svg>
    </div>
  );
};
