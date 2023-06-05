import {
  MouseEvent,
  useCallback,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from "react";

import styles from "components/Range/Range.module.scss";
import { clamp } from "utils/clamp";
import {
  handleBulletMouseDown,
  handleBulletDragEnd,
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

const RangeFixed = ({
  values,
  dragging,
  setDragging,
  rangeWidthRef,
  rangeLeftRef,
}: Props) => {
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(values.length - 1);
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
          maxIndex
        );

        // Update the MinIndex state
        setMinIndex(newMinIndex);
      }

      if (dragging === "max") {
        // Calculate the new value based on the range and limits
        const newMaxIndex = clamp(
          Math.round(((clientX - rangeLeft) / rangeWidth) * values.length),
          minIndex,
          values.length - 1
        );

        // Update the MinIndex state
        setMaxIndex(newMaxIndex);
      }
    },
    [values, dragging, maxIndex, minIndex, rangeWidth, rangeLeft]
  );

  const sliderDragProps = {
    dragging,
    handleBulletDrag,
    handleBulletDragEnd,
    setDragging,
  };

  useSliderDrag(sliderDragProps);

  return (
    <div data-testid="range-fixed">
      <div
        className={styles["range-highlight"]}
        style={{
          left: `${(minIndex / (values.length - 1)) * 100}%`,
          width: `${((maxIndex - minIndex) / (values.length - 1)) * 100}%`,
        }}
      />
      <div
        data-testid="min-bullet"
        className={`${styles["bullet"]} ${
          dragging === "min" ? styles["dragging"] : ""
        } ${styles["min-bullet"]}`}
        style={{
          left: `${(minIndex / (values.length - 1)) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={event =>
          handleBulletMouseDown({ event, type: "min", setDragging })
        }
      />
      <div
        data-testid="max-bullet"
        className={`${styles["bullet"]} ${
          dragging === "max" ? styles["dragging"] : ""
        } ${styles["max-bullet"]} `}
        style={{
          left: `${(maxIndex / (values.length - 1)) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={event =>
          handleBulletMouseDown({ event, type: "max", setDragging })
        }
      />
    </div>
  );
};

export default RangeFixed;
