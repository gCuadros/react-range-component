import {
  MouseEvent,
  useCallback,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
} from "react";

import styles from "components/Range/Range.module.scss";
import { clamp } from "utils/clamp";
import {
  handleBulletMouseDown,
  handleBulletDragEnd,
} from "utils/rangeInput/mouseHandlers";
import useSliderDrag from "utils/rangeInput/useDraggableBullet";

import { RANGE_ACTION_TYPE, RangeEventAction } from "..";
import { useRangeContext } from "../Context/useRangeContext";

interface Props {
  values: number[];
  dragging: RangeEventAction | null;
  setDragging: Dispatch<SetStateAction<RangeEventAction | null>>;
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
  const { minValue, setMinValue, maxValue, setMaxValue } = useRangeContext();
  const rangeWidth = rangeWidthRef.current;
  const rangeLeft = rangeLeftRef.current;

  useEffect(() => {
    setMinValue(0);
    setMaxValue(values.length - 1);
  }, [values]);

  const handleBulletDrag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const clientX = event.clientX;

      if (dragging === RANGE_ACTION_TYPE.MIN) {
        // Calculate the new value based on the range and limits
        const newMinIndex = clamp(
          Math.round(((clientX - rangeLeft) / rangeWidth) * values.length),
          0,
          maxValue
        );

        // Update the MinIndex state
        setMinValue(newMinIndex);
      }

      if (dragging === RANGE_ACTION_TYPE.MAX) {
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
          left: `${(minValue / (values.length - 1)) * 100}%`,
          width: `${((maxValue - minValue) / (values.length - 1)) * 100}%`,
        }}
      />
      <div
        data-testid="min-bullet"
        className={`${styles["bullet"]} ${
          dragging === RANGE_ACTION_TYPE.MIN ? styles["dragging"] : ""
        } ${styles["min-bullet"]}`}
        style={{
          left: `${(minValue / (values.length - 1)) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={event =>
          handleBulletMouseDown({
            event,
            type: RANGE_ACTION_TYPE.MIN,
            setDragging,
          })
        }
      />
      <div
        data-testid="max-bullet"
        className={`${styles["bullet"]} ${
          dragging === RANGE_ACTION_TYPE.MAX ? styles["dragging"] : ""
        } ${styles["max-bullet"]} `}
        style={{
          left: `${(maxValue / (values.length - 1)) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={event =>
          handleBulletMouseDown({
            event,
            type: RANGE_ACTION_TYPE.MAX,
            setDragging,
          })
        }
      />
    </div>
  );
};

export default RangeFixed;
