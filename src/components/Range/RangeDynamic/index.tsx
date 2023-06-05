import React, {
  useEffect,
  MouseEvent,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";

import styles from "components/Range/Range.module.scss";

type MouseEventAction = "min" | "max";

interface Props {
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

const RangeDynamic = ({
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
  const handleBulletDrag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      if (dragging === "min") {
        const newValue = Math.min(
          Math.max(event.clientX - rangeLeftRef.current, 0),
          rangeWidthRef.current
        );
        setMinValue(
          Math.min(
            Math.round((newValue / rangeWidthRef.current) * 100),
            maxValue
          )
        );
      }

      if (dragging === "max") {
        const newValue = Math.min(
          Math.max(event.clientX - rangeLeftRef.current, 0),
          rangeWidthRef.current
        );
        setMaxValue(
          Math.max(
            Math.round((newValue / rangeWidthRef.current) * 100),
            minValue
          )
        );
      }
    },
    [dragging, maxValue, minValue]
  );

  useEffect(() => {
    const handleMouseDrag = (event: MouseEvent | any) => {
      if (dragging) {
        handleBulletDrag(event);
      }
    };

    const handleMouseUp = () => {
      if (dragging) {
        handleBulletDragEnd();
      }
    };

    document.addEventListener("mousemove", handleMouseDrag);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

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
        onMouseDown={event => handleBulletMouseDown(event, "min")}
      />
      <div
        data-testid="max-bullet"
        className={`${styles["bullet"]} ${
          dragging === "max" ? styles["dragging"] : ""
        } ${styles["max-bullet"]} `}
        style={{ left: `${maxValue}%`, transform: "translate(-50%, -50%)" }}
        onMouseDown={event => handleBulletMouseDown(event, "max")}
      />
    </div>
  );
};

export default RangeDynamic;
