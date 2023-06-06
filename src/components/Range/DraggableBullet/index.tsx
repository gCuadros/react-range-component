import React, { Dispatch, SetStateAction } from "react";

import styles from "components/Range/Range.module.scss";
import { handleBulletMouseDown } from "utils/rangeInput/mouseHandlers";

import { RangeEventAction } from "..";
import { useRangeContext } from "../Context/useRangeContext";

interface DragHandleProps {
  values: number[];
  dragging: RangeEventAction | null;
  setDragging: Dispatch<SetStateAction<RangeEventAction | null>>;
}

interface DraggableBulletStylesProps {
  "dynamic-min": {
    left: string;
    transform: string;
  };
  "dynamic-max": {
    left: string;
    transform: string;
  };
  "fixed-min": {
    left: string;
    transform: string;
  };
  "fixed-max": {
    left: string;
    transform: string;
  };
}

const getDraggableBulletStyle = (
  draggableBulletStyles: DraggableBulletStylesProps,
  values: number[],
  dragging: RangeEventAction | null
) => {
  if (!dragging) return;
  const rangeFeature = values.length === 2 ? "dynamic" : "fixed";
  return draggableBulletStyles[`${rangeFeature}-${dragging}`];
};

const DraggableBullet = ({
  values,
  dragging,
  setDragging,
}: DragHandleProps) => {
  const { minValue, maxValue } = useRangeContext();

  const draggableBulletStyle = {
    "dynamic-min": { left: `${minValue}%`, transform: "translate(-50%, -50%)" },
    "dynamic-max": { left: `${maxValue}%`, transform: "translate(-50%, -50%)" },
    "fixed-min": {
      left: `${(minValue / (values.length - 1)) * 100}%`,
      transform: "translate(-50%, -50%)",
    },
    "fixed-max": {
      left: `${(maxValue / (values.length - 1)) * 100}%`,
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div
      data-testid="min-bullet"
      className={`${styles["bullet"]} ${
        dragging === "min" ? styles["dragging"] : ""
      } ${styles["min-bullet"]}`}
      style={getDraggableBulletStyle(draggableBulletStyle, values, dragging)}
      onMouseDown={event =>
        handleBulletMouseDown({ event, type: dragging, setDragging })
      }
    />
  );
};

export default DraggableBullet;
