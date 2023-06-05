import React, {
  MouseEvent,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import styles from "components/Range/Range.module.scss";
import {
  handleBulletDragEnd,
  handleBulletMouseDown,
} from "utils/rangeInput/mouseHandlers";
import useSliderDrag from "utils/rangeInput/useDraggableBullet";

import { MouseEventAction } from "..";

interface Props {
  values: number[];
  dragging: MouseEventAction | null;
  setDragging: Dispatch<SetStateAction<MouseEventAction | null>>;
  rangeWidthRef: MutableRefObject<number>;
  rangeLeftRef: MutableRefObject<number>;
}

const RangeDynamic = ({
  values,
  dragging,
  setDragging,
  rangeWidthRef,
  rangeLeftRef,
}: Props) => {
  const [minValue, setMinValue] = useState<number>(values[0]);
  const [maxValue, setMaxValue] = useState<number>(values[1]);
  const rangeWidth = rangeWidthRef.current;
  const rangeLeft = rangeLeftRef.current;

  const handleBulletDrag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      const clientX = event.clientX;

      if (dragging === "min") {
        const newValue = Math.min(Math.max(clientX - rangeLeft, 0), rangeWidth);
        setMinValue(
          Math.min(Math.round((newValue / rangeWidth) * 100), maxValue)
        );
      }

      if (dragging === "max") {
        const newValue = Math.min(Math.max(clientX - rangeLeft, 0), rangeWidth);
        setMaxValue(
          Math.max(Math.round((newValue / rangeWidth) * 100), minValue)
        );
      }
    },
    [dragging, maxValue, minValue]
  );

  const sliderDragProps = {
    dragging,
    handleBulletDrag,
    handleBulletDragEnd,
    setDragging,
  };

  useSliderDrag(sliderDragProps);

  return (
    <div data-testid="range-dynamic">
      <div
        className={styles["range-highlight"]}
        style={{ left: `${minValue}%`, width: `${maxValue - minValue}%` }}
      />
      <div
        data-testid="min-bullet"
        className={`${styles["bullet"]} ${
          dragging === "min" ? styles["dragging"] : ""
        } ${styles["min-bullet"]}`}
        style={{ left: `${minValue}%`, transform: "translate(-50%, -50%)" }}
        onMouseDown={event =>
          handleBulletMouseDown({ event, type: "min", setDragging })
        }
      />
      <div
        data-testid="max-bullet"
        className={`${styles["bullet"]} ${
          dragging === "max" ? styles["dragging"] : ""
        } ${styles["max-bullet"]} `}
        style={{ left: `${maxValue}%`, transform: "translate(-50%, -50%)" }}
        onMouseDown={event =>
          handleBulletMouseDown({ event, type: "max", setDragging })
        }
      />
    </div>
  );
};

export default RangeDynamic;
