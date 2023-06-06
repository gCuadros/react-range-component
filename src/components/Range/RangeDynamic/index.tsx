import React, {
  MouseEvent,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import styles from "components/Range/Range.module.scss";
import {
  handleBulletDragEnd,
  handleBulletMouseDown,
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

const RangeDynamic = ({
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
    setMinValue(values[0]);
    setMaxValue(values[1]);
  }, [values]);

  const handleBulletDrag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      const clientX = event.clientX;

      if (dragging === RANGE_ACTION_TYPE.MIN) {
        const newValue = Math.min(Math.max(clientX - rangeLeft, 0), rangeWidth);
        setMinValue(
          Math.min(Math.round((newValue / rangeWidth) * 100), maxValue)
        );
      }

      if (dragging === RANGE_ACTION_TYPE.MAX) {
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
          dragging === RANGE_ACTION_TYPE.MIN ? styles["dragging"] : ""
        } ${styles["min-bullet"]}`}
        style={{ left: `${minValue}%`, transform: "translate(-50%, -50%)" }}
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
        style={{ left: `${maxValue}%`, transform: "translate(-50%, -50%)" }}
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

export default RangeDynamic;
