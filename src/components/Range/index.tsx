import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
} from "react";

import styles from "./Range.module.scss";

type MouseEventAction = "min" | "max";

const Range: React.FC = () => {
  const rangeRef = useRef<HTMLDivElement>(null);
  const [minValue, setMin] = useState<number>(0);
  const [maxValue, setMax] = useState<number>(100);
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
        const newValue = Math.min(
          Math.max(event.clientX - rangeLeftRef.current, 0),
          rangeWidthRef.current
        );
        setMin(
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
        setMax(
          Math.max(
            Math.round((newValue / rangeWidthRef.current) * 100),
            minValue
          )
        );
      }
    },
    [dragging, maxValue, minValue]
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
    <div className={styles["range-box"]}>
      <div className={styles["range-container"]}>
        <p className={styles["min-value"]}>
          {minValue}
          <span>€</span>
        </p>
        <div className={`${styles["range-track"]}`} ref={rangeRef}>
          <div
            className={styles["range-highlight"]}
            style={{ left: `${minValue}%`, width: `${maxValue - minValue}%` }}
          />
          <div
            className={`${styles["bullet"]} ${
              dragging === "min" ? styles["dragging"] : ""
            } ${styles["min-bullet"]}`}
            style={{ left: `${minValue}%`, transform: "translate(-50%, -50%)" }}
            onMouseDown={event => handleBulletMouseDown(event, "min")}
          />
          <div
            className={`${styles["bullet"]} ${
              dragging === "max" ? styles["dragging"] : ""
            } ${styles["max-bullet"]} `}
            style={{ left: `${maxValue}%`, transform: "translate(-50%, -50%)" }}
            onMouseDown={event => handleBulletMouseDown(event, "max")}
          />
        </div>
        <p className={styles["max-value"]}>
          {maxValue}
          <span>€</span>
        </p>
      </div>
    </div>
  );
};

export default Range;
