// DragHandle.js
import React from "react";
import { MouseEvent } from "react";

import styles from "./DragHandle.module.css";

interface DragHandleProps {
  type: "min" | "max";
  dragging: "min" | "max" | null;
  handleBulletMouseDown: (
    event: MouseEvent<HTMLDivElement>,
    type: "min" | "max"
  ) => void;
  handleBulletMouseMove: (event: MouseEvent<HTMLDivElement>) => void;
  handleBulletMouseUp: () => void;
}

const DraggableBullet = ({
  type,
  dragging,
  handleBulletMouseDown,
  handleBulletMouseMove,
  handleBulletMouseUp,
}: DragHandleProps) => {
  return (
    <div
      data-testid={`${type}-bullet`}
      className={`${dragging === type ? styles["dragging"] : ""} ${
        styles[`${type}-bullet`]
      }`}
      style={{
        left: `${type === "min" ? minValue : maxValue}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseDown={event => handleBulletMouseDown(event, type)}
      onMouseMove={handleBulletMouseMove}
      onMouseUp={handleBulletMouseUp}
    />
  );
};

export default DragHandle;
