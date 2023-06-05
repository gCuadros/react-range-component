import {
  useEffect,
  MouseEvent,
  useCallback,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

import styles from "components/Range/Range.module.scss";

type MouseEventAction = "min" | "max";

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
  const handleBulletDrag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (dragging === "min") {
        const newMinIndex = Math.min(
          Math.max(
            Math.round(
              ((event.clientX - rangeLeftRef.current) / rangeWidthRef.current) *
                values.length
            ),
            0
          ),
          maxValue
        );
        setMinValue(newMinIndex);
      }

      if (dragging === "max") {
        const newMaxIndex = Math.max(
          Math.min(
            Math.round(
              ((event.clientX - rangeLeftRef.current) / rangeWidthRef.current) *
                values.length
            ),
            values.length - 1
          ),
          minValue
        );
        setMaxValue(newMaxIndex);
      }
    },
    [values, dragging, maxValue, minValue]
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
