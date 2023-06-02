import { useMemo } from "react";

import SkeletonLine from "components/SkeletonLine";

import styles from "./Range.module.scss";
import RangeDynamic from "./RangeDynamic";
import RangeFixed from "./RangeFixed";

interface Props {
  values?: number[];
  isLoading?: boolean;
}

const Range = ({ values, isLoading }: Props) => {
  const allowedValues = useMemo(
    () => (values ? Array.from(new Set(values)).sort((a, b) => a - b) : []),
    [values]
  );
  const isDynamic = allowedValues.length === 2;
  const isFixed = allowedValues.length > 2;

  if (isLoading || !values)
    return (
      <div className={styles["range-box"]}>
        <SkeletonLine />
      </div>
    );

  if (isDynamic) {
    return <RangeDynamic values={allowedValues} />;
  }

  if (isFixed) {
    return <RangeFixed values={allowedValues} />;
  }

  return null;
};

export default Range;
