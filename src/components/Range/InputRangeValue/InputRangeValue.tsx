import { ChangeEvent } from "react";

import styles from "components/Range/Range.module.scss";
import { isNumericString } from "utils/isNumericString";

import { MouseEventAction } from "..";
import { useRangeContext } from "../Context/useRangeContext";

interface Props {
  values: number[];
  type: MouseEventAction;
  isFixed: boolean;
  isDynamic: boolean;
  defaultMinValue: number;
  defaultMaxValue: number;
}

const InputRangeValue = ({
  values,
  type,
  isFixed,
  isDynamic,
  defaultMinValue,
  defaultMaxValue,
}: Props) => {
  const { minValue, setMinValue, maxValue, setMaxValue } = useRangeContext();

  const handleMinValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNumericString(event.target.value) || isFixed) return;

    const value =
      parseInt(event.target.value) < defaultMinValue
        ? defaultMinValue
        : parseInt(event.target.value);

    setMinValue(Math.min(value, maxValue));
  };

  const handleMaxValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isNumericString(event.target.value) || isFixed) return;

    const value =
      parseInt(event.target.value) > defaultMaxValue
        ? defaultMaxValue
        : parseInt(event.target.value);

    setMaxValue(Math.max(value, minValue));
  };

  return (
    <span
      className={`${styles["input-wrapper"]} ${styles["input-wrapper--left"]} `}
    >
      {type === "min" && (
        <input
          id="minValue"
          type="number"
          data-testid="min-value"
          readOnly={isFixed ? true : false}
          value={isDynamic ? minValue : values[minValue]}
          min={defaultMinValue}
          max={defaultMaxValue}
          onChange={handleMinValueChange}
          className={`${styles["range-handler"]} ${
            isFixed ? styles["range-handler--fixed"] : ""
          }`}
        />
      )}
      {type === "max" && (
        <input
          id="maxValue"
          type="number"
          data-testid="max-value"
          readOnly={isFixed ? true : false}
          value={
            isDynamic ? maxValue : values[maxValue] || values[values.length - 1]
          }
          min={defaultMinValue}
          max={defaultMaxValue}
          onChange={handleMaxValueChange}
          className={`${styles["range-handler"]} ${
            isFixed ? styles["range-handler--fixed"] : ""
          }`}
        />
      )}
      €
    </span>
  );
};

export default InputRangeValue;
