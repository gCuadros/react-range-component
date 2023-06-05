import { useState, useRef, useMemo, useEffect } from "react";

import styles from "components/Range/Range.module.scss";
import SkeletonLine from "components/SkeletonLine";

import { RangeProvider } from "./Context/RangeContext";
import InputRangeValue from "./InputRangeValue/InputRangeValue";
import RangeDynamic from "./RangeDynamic";
import RangeFixed from "./RangeFixed";

interface Props {
  allowedValues?: number[];
  isLoading?: boolean;
}

export type RangeEventAction = "min" | "max";

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
  const rangeWidthRef = useRef<number>(0);
  const rangeLeftRef = useRef<number>(0);
  const [dragging, setDragging] = useState<RangeEventAction | null>(null);

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
  }, [values, rangeRef]);

  if (isLoading || !values)
    return (
      <div className={styles["range-box"]}>
        <SkeletonLine />
      </div>
    );

  return (
    <RangeProvider>
      <div className={styles["range-box"]}>
        <div className={styles["range-container"]}>
          <InputRangeValue
            type="min"
            values={values}
            isFixed={isFixed}
            isDynamic={isDynamic}
            defaultMinValue={defaultMinValue}
            defaultMaxValue={defaultMaxValue}
          />

          <div className={`${styles["range-track"]}`} ref={rangeRef}>
            {isDynamic && (
              <RangeDynamic
                values={values}
                dragging={dragging}
                setDragging={setDragging}
                rangeWidthRef={rangeWidthRef}
                rangeLeftRef={rangeLeftRef}
              />
            )}

            {isFixed && (
              <RangeFixed
                values={values}
                dragging={dragging}
                setDragging={setDragging}
                rangeWidthRef={rangeWidthRef}
                rangeLeftRef={rangeLeftRef}
              />
            )}
          </div>

          <InputRangeValue
            type="max"
            values={values}
            isFixed={isFixed}
            isDynamic={isDynamic}
            defaultMinValue={defaultMinValue}
            defaultMaxValue={defaultMaxValue}
          />
        </div>
      </div>
    </RangeProvider>
  );
};

export default Range;
