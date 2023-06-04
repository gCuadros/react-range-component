import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
} from "react";

import styles from "components/Range/Range.module.scss";

type MouseEventAction = "min" | "max";

interface Props {
  values: number[];
}

const RangeFixed = ({ values }: Props) => {
  const rangeRef = useRef<HTMLDivElement>(null);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(values.length - 1);
  const [dragging, setDragging] = useState<MouseEventAction | null>(null);
  const rangeWidthRef = useRef<number>(0);
  const rangeLeftRef = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (rangeRef.current) {
        const rangeSizes = rangeRef.current.getBoundingClientRect();
        rangeWidthRef.current = rangeSizes.width;
        rangeLeftRef.current = rangeSizes.left;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBulletMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>, type: MouseEventAction) => {
      event.preventDefault();
      setDragging(type);
    },
    []
  );

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
          maxIndex
        );
        setMinIndex(newMinIndex);
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
          minIndex
        );
        setMaxIndex(newMaxIndex);
      }
    },
    [values, dragging, maxIndex, minIndex]
  );

  const handleBulletDragEnd = useCallback(() => {
    setDragging(null);
  }, []);

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
    <div className={styles["range-box"]} data-testid="range-fixed">
      <div className={styles["range-container"]}>
        <p className={styles["min-value"]}>
          {values[minIndex]}
          <span>€</span>
        </p>
        <div className={`${styles["range-track"]}`} ref={rangeRef}>
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
            onMouseDown={event => handleBulletMouseDown(event, "min")}
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
            onMouseDown={event => handleBulletMouseDown(event, "max")}
          />
        </div>
        <p className={styles["max-value"]}>
          {values[maxIndex]}
          <span>€</span>
        </p>
      </div>
    </div>
  );
};

export default RangeFixed;
