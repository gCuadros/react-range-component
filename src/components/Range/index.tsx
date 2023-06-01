import { useMemo } from "react";

import RangeDynamic from "./RangeDynamic";
import RangeFixed from "./RangeFixed";

interface Props {
  values: number[];
}

const Range = ({ values }: Props) => {
  const allowedValues = useMemo(
    () => Array.from(new Set(values)).sort((a, b) => a - b),
    [values]
  );
  const isDynamic = allowedValues.length === 2;
  const isFixed = allowedValues.length > 2;

  if (isDynamic) {
    return <RangeDynamic values={allowedValues} />;
  }

  if (isFixed) {
    return <RangeFixed values={allowedValues} />;
  }

  return null;
};

export default Range;
