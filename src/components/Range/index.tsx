import {
  useState,
  useRef,
  MouseEvent,
  useCallback,
  ChangeEvent,
  useMemo,
  useEffect,
} from "react";

import SkeletonLine from "components/SkeletonLine";

import styles from "./Range.module.scss";

type MouseEventAction = "min" | "max";

interface Props {
  allowedValues?: number[];
  isLoading?: boolean;
}

const Range = ({ allowedValues, isLoading }: Props) => {
  const values = useMemo(
    () =>
      allowedValues
        ? Array.from(new Set(allowedValues)).sort((a, b) => a - b)
        : [],
    [allowedValues, isLoading]
  );

  const isDynamic = useMemo(() => values.length === 2, [values]);
  const isFixed = useMemo(() => values.length > 2, [values]);

  const rangeRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [dragging, setDragging] = useState<MouseEventAction | null>(null);
  const rangeWidthRef = useRef<number>(0);
  const rangeLeftRef = useRef<number>(0);

  useEffect(() => {
    const defaultMinValue = isDynamic ? values[0] : 0;
    const defaultMaxValue = isDynamic ? values[1] : values.length - 1;

    const handleResize = () => {
      if (rangeRef.current) {
        const rangeSizes = rangeRef.current.getBoundingClientRect();
        rangeWidthRef.current = rangeSizes.width;
        rangeLeftRef.current = rangeSizes.left;
      }
    };

    window.addEventListener("resize", handleResize);
    setMinValue(defaultMinValue);
    setMaxValue(defaultMaxValue);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [values, rangeRef]);

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value || values[0].toString());
    setMinValue(Math.min(value, maxValue));
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      parseInt(event.target.value) > values[1]
        ? maxValue
        : parseInt(event.target.value) || minValue;
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

      //calculate for min bullet
      if (dragging === "min") {
        if (isDynamic) {
          const newMinValue = Math.min(
            Math.max(event.clientX - rangeLeftRef.current, 0),
            rangeWidthRef.current
          );

          setMinValue(
            Math.min(
              Math.round((newMinValue / rangeWidthRef.current) * 100),
              maxValue
            )
          );
        }

        if (isFixed) {
          const newMinValue = Math.min(
            Math.max(
              Math.round(
                ((event.clientX - rangeLeftRef.current) /
                  rangeWidthRef.current) *
                  values.length
              ),
              0
            ),
            maxValue
          );

          setMinValue(newMinValue);
        }
      }

      //calculate for max bullet
      if (dragging === "max") {
        if (isDynamic) {
          const newMaxIndex = Math.min(
            Math.max(event.clientX - rangeLeftRef.current, 0),
            rangeWidthRef.current
          );

          setMaxValue(
            Math.max(
              Math.round((newMaxIndex / rangeWidthRef.current) * 100),
              minValue
            )
          );
        }

        if (isFixed) {
          const newMaxIndex = Math.max(
            Math.min(
              Math.round(
                ((event.clientX - rangeLeftRef.current) /
                  rangeWidthRef.current) *
                  values.length
              ),
              values.length - 1
            ),
            minValue
          );
          setMaxValue(newMaxIndex);
        }
      }
    },
    [values, dragging, maxValue, minValue, isDynamic, isFixed]
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

  if (isLoading || !values)
    return (
      <div className={styles["range-box"]}>
        <SkeletonLine />
      </div>
    );

  return (
    <div className={styles["range-box"]} data-testid="range-dynamic">
      <div className={styles["range-container"]}>
        {isDynamic && (
          <span
            className={`${styles["input-wrapper"]} ${styles["input-wrapper--left"]} `}
          >
            <input
              id="minValue"
              data-testid="minValue"
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
        )}
        {isFixed && (
          <p className={styles["min-value"]}>
            {values[minValue]}
            <span>€</span>
          </p>
        )}

        <div className={`${styles["range-track"]}`} ref={rangeRef}>
          <div
            className={styles["range-highlight"]}
            style={
              isDynamic
                ? { left: `${minValue}%`, width: `${maxValue - minValue}%` }
                : {
                    left: `${(minValue / (values.length - 1)) * 100}%`,
                    width: `${
                      ((maxValue - minValue) / (values.length - 1)) * 100
                    }%`,
                  }
            }
          />
          <div
            data-testid="min-bullet"
            className={`${styles["bullet"]} ${styles["min-bullet"]} ${
              dragging === "min" ? styles["dragging"] : ""
            }`}
            style={
              isDynamic
                ? {
                    left: `${minValue}%`,
                    transform: "translate(-50%, -50%)",
                  }
                : {
                    left: `${(minValue / (values.length - 1)) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }
            }
            onMouseDown={event => handleBulletMouseDown(event, "min")}
          />
          <div
            data-testid="max-bullet"
            className={`${styles["bullet"]} ${styles["max-bullet"]} ${
              dragging === "max" ? styles["dragging"] : ""
            }`}
            style={
              isDynamic
                ? {
                    left: `${maxValue}%`,
                    transform: "translate(-50%, -50%)",
                  }
                : {
                    left: `${(maxValue / (values.length - 1)) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }
            }
            onMouseDown={event => handleBulletMouseDown(event, "max")}
          />
        </div>

        {isDynamic && (
          <span
            className={`${styles["input-wrapper"]} ${styles["input-wrapper--right"]} `}
          >
            <input
              id="maxValue"
              data-testid="maxValue"
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
        )}
        {isFixed && (
          <p className={styles["max-value"]}>
            {values[maxValue]}
            <span>€</span>
          </p>
        )}
      </div>
    </div>
  );

  // "I leave this option commented as an alternative, where although some parts of the code are repeated,
  // it improves readability in my opinion. I chose the proposed option as I believe it better aligns with the requirements of the task."
  if (isDynamic) {
    return (
      <div className={styles["range-box"]} data-testid="range-dynamic">
        <div className={styles["range-container"]}>
          <span
            className={`${styles["input-wrapper"]} ${styles["input-wrapper--left"]} `}
          >
            <input
              id="minValue"
              data-testid="minValue"
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
              style={{
                left: `${minValue}%`,
                transform: "translate(-50%, -50%)",
              }}
              data-testid="min-bullet"
              onMouseDown={event => handleBulletMouseDown(event, "min")}
            />
            <div
              className={`${styles["bullet"]} ${
                dragging === "max" ? styles["dragging"] : ""
              } ${styles["max-bullet"]} `}
              style={{
                left: `${maxValue}%`,
                transform: "translate(-50%, -50%)",
              }}
              data-testid="max-bullet"
              onMouseDown={event => handleBulletMouseDown(event, "max")}
            />
          </div>
          <span
            className={`${styles["input-wrapper"]} ${styles["input-wrapper--right"]} `}
          >
            <input
              id="maxValue"
              data-testid="maxValue"
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
  }

  if (isFixed) {
    return (
      <div className={styles["range-box"]} data-testid="range-fixed">
        <div className={styles["range-container"]}>
          <p className={styles["min-value"]}>
            {values[minValue]}
            <span>€</span>
          </p>
          <div className={`${styles["range-track"]}`} ref={rangeRef}>
            <div
              className={styles["range-highlight"]}
              style={{
                left: `${(minValue / (values.length - 1)) * 100}%`,
                width: `${
                  ((maxValue - minValue) / (values.length - 1)) * 100
                }%`,
              }}
            />
            <div
              className={`${styles["bullet"]} ${
                dragging === "min" ? styles["dragging"] : ""
              } ${styles["min-bullet"]}`}
              style={{
                left: `${(minValue / (values.length - 1)) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              data-testid="min-bullet"
              onMouseDown={event => handleBulletMouseDown(event, "min")}
            />
            <div
              className={`${styles["bullet"]} ${
                dragging === "max" ? styles["dragging"] : ""
              } ${styles["max-bullet"]} `}
              style={{
                left: `${(maxValue / (values.length - 1)) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              data-testid="max-bullet"
              onMouseDown={event => handleBulletMouseDown(event, "max")}
            />
          </div>
          <p className={styles["max-value"]}>
            {values[maxValue]}
            <span>€</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Range;
