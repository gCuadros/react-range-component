import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useCallback,
  ChangeEvent,
} from "react";

import styles from "./Range.module.scss";

type MouseEventAction = "min" | "max";

interface Props {
  values: number[];
}

const RangeDynamic = ({ values }: Props) => {
  const defaultMinValue = values[0];
  const defaultMaxValue = values[1];

  const rangeRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState<number>(defaultMinValue);
  const [maxValue, setMaxValue] = useState<number>(defaultMaxValue);
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

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value || "0");
    setMinValue(Math.min(value, maxValue));
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      parseInt(event.target.value) > defaultMaxValue
        ? defaultMaxValue
        : parseInt(event.target.value) || defaultMinValue;
    setMaxValue(Math.max(value, minValue));
  };

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
        <span
          className={`${styles["input-wrapper"]} ${styles["input-wrapper--left"]} `}
        >
          <input
            id="minValue"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={minValue}
            min={minValue}
            max={maxValue}
            onChange={handleMinChange}
            className={styles["range-handler"]}
          />
          €
        </span>

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
        <span
          className={`${styles["input-wrapper"]} ${styles["input-wrapper--right"]} `}
        >
          <input
            id="maxValue"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={maxValue}
            min={minValue}
            max={maxValue}
            onChange={handleMaxChange}
            className={styles["range-handler"]}
          />
          €
        </span>
      </div>
    </div>
  );
};

export default RangeDynamic;
