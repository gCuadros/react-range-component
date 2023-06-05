import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  MouseEvent,
  ChangeEvent,
} from "react";

import styles from "components/Range/Range.module.scss";
import SkeletonLine from "components/SkeletonLine";
import { isNumericString } from "utils/isNumericString";

import RangeDynamic from "./RangeDynamic";
import RangeFixed from "./RangeFixed";

interface Props {
  allowedValues?: number[];
  isLoading?: boolean;
}

export type MouseEventAction = "min" | "max";

const Range = ({ allowedValues, isLoading }: Props) => {
  const values = useMemo(
    () =>
      allowedValues
        ? Array.from(new Set(allowedValues)).sort((a, b) => a - b)
        : [],
    [allowedValues]
  );

  const isDynamic = useMemo(() => values.length === 2, [values]);
  const isFixed = useMemo(() => values.length > 2, [values]);

  const defaultMinValue = isDynamic ? values[0] : 0;
  const defaultMaxValue = isDynamic ? values[1] : values.length - 1;

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
    setMinValue(defaultMinValue);
    setMaxValue(defaultMaxValue);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [values, rangeRef]);

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNumericString(event.target.value) || isFixed) return;

    const value =
      parseInt(event.target.value) < defaultMinValue
        ? defaultMinValue
        : parseInt(event.target.value);

    setMinValue(Math.min(value, maxValue));
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNumericString(event.target.value) || isFixed) return;

    const value =
      parseInt(event.target.value) > defaultMaxValue
        ? defaultMaxValue
        : parseInt(event.target.value);

    setMaxValue(Math.max(value, minValue));
  };

  const handleBulletMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>, type: MouseEventAction) => {
      event.preventDefault();
      setDragging(type);
    },
    []
  );

  const handleBulletDragEnd = useCallback(() => {
    setDragging(null);
  }, []);

  if (isLoading || !values)
    return (
      <div className={styles["range-box"]}>
        <SkeletonLine />
      </div>
    );

  return (
    <div className={styles["range-box"]}>
      <div className={styles["range-container"]}>
        <span
          className={`${styles["input-wrapper"]} ${styles["input-wrapper--left"]} `}
        >
          <input
            id="minValue"
            type="number"
            data-testid="min-value"
            readOnly={isFixed ? true : false}
            value={isDynamic ? minValue : values[minValue]}
            min={defaultMinValue}
            max={defaultMaxValue}
            onChange={handleMinChange}
            className={`${styles["range-handler"]} ${
              isFixed ? styles["range-handler--fixed"] : ""
            }`}
          />
          €
        </span>

        <div className={`${styles["range-track"]}`} ref={rangeRef}>
          {isDynamic && (
            <RangeDynamic
              minValue={minValue}
              setMinValue={setMinValue}
              maxValue={maxValue}
              setMaxValue={setMaxValue}
              dragging={dragging}
              rangeWidthRef={rangeWidthRef}
              rangeLeftRef={rangeLeftRef}
              handleBulletMouseDown={handleBulletMouseDown}
              handleBulletDragEnd={handleBulletDragEnd}
            />
          )}

          {isFixed && (
            <RangeFixed
              values={values}
              minValue={minValue}
              setMinValue={setMinValue}
              maxValue={maxValue}
              setMaxValue={setMaxValue}
              dragging={dragging}
              rangeWidthRef={rangeWidthRef}
              rangeLeftRef={rangeLeftRef}
              handleBulletMouseDown={handleBulletMouseDown}
              handleBulletDragEnd={handleBulletDragEnd}
            />
          )}
        </div>

        <span
          className={`${styles["input-wrapper"]} ${styles["input-wrapper--right"]} `}
        >
          <input
            id="maxValue"
            type="number"
            data-testid="max-value"
            readOnly={isFixed ? true : false}
            value={
              isDynamic
                ? maxValue
                : values[maxValue] || values[values.length - 1]
            }
            min={defaultMinValue}
            max={defaultMaxValue}
            onChange={handleMaxChange}
            className={`${styles["range-handler"]} ${
              isFixed ? styles["range-handler--fixed"] : ""
            }`}
          />
          €
        </span>
      </div>
    </div>
  );
};

export default Range;
