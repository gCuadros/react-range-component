import {
  MouseEvent,
  useCallback,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

import styles from "components/Range/Range.module.scss";
import { clamp } from "utils/clamp";
import useSliderDrag from "utils/rangeInput/useDraggableBullet";

import { MouseEventAction } from "..";

interface Props {
  values: number[];
  minValue: number;
  setMinValue: Dispatch<SetStateAction<number>>;
  maxValue: number;
  setMaxValue: Dispatch<SetStateAction<number>>;
  dragging: MouseEventAction | null;
  rangeWidthRef: MutableRefObject<number>;
  rangeLeftRef: MutableRefObject<number>;
  handleBulletMouseDown: (
    event: MouseEvent<HTMLDivElement>,
    type: MouseEventAction
  ) => void;
  handleBulletDragEnd: () => void;
}

const RangeFixed = ({
  values,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  dragging,
  rangeWidthRef,
  rangeLeftRef,
  handleBulletMouseDown,
  handleBulletDragEnd,
}: Props) => {
  const rangeWidth = rangeWidthRef.current;
  const rangeLeft = rangeLeftRef.current;

  const handleBulletDrag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const clientX = event.clientX;

      if (dragging === "min") {
        // Calculate the new value based on the range and limits
        const newMinIndex = clamp(
          Math.round(((clientX - rangeLeft) / rangeWidth) * values.length),
          0,
          maxValue
        );

        // Update the MinIndex state
        setMinValue(newMinIndex);
      }

      if (dragging === "max") {
        // Calculate the new value based on the range and limits
        const newMaxIndex = clamp(
          Math.round(((clientX - rangeLeft) / rangeWidth) * values.length),
          minValue,
          values.length - 1
        );

        // Update the MinIndex state
        setMaxValue(newMaxIndex);
      }
    },
    [values, dragging, maxValue, minValue, rangeWidth, rangeLeft]
  );

  const sliderDragProps = {
    dragging: dragging,
    handleBulletDrag: handleBulletDrag,
    handleBulletDragEnd: handleBulletDragEnd,
  };

  useSliderDrag(sliderDragProps);

  return (
    <div data-testid="range-fixed">
      <div
        className={styles["range-highlight"]}
        style={{
          left: `${(minValue / (values.length - 1)) * 100}%`,
          width: `${((maxValue - minValue) / (values.length - 1)) * 100}%`,
        }}
      />
      <div
        data-testid="min-bullet"
        className={`${styles["bullet"]} ${
          dragging === "min" ? styles["dragging"] : ""
        } ${styles["min-bullet"]}`}
        style={{
          left: `${(minValue / (values.length - 1)) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={event => handleBulletMouseDown(event, "min")}
      />
      <div
        data-testid="max-bullet"
        className={`${styles["bullet"]} ${
          dragging === "max" ? styles["dragging"] : ""
        } ${styles["max-bullet"]} `}
        style={{
          left: `${(maxValue / (values.length - 1)) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={event => handleBulletMouseDown(event, "max")}
      />
    </div>
  );
};

export default RangeFixed;
