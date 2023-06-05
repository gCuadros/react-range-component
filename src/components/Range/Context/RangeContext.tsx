import { createContext, useState } from "react";

type RangeContextType = {
  minValue: number;
  setMinValue: (minValue: number) => void;
  maxValue: number;
  setMaxValue: (minValue: number) => void;
};

type RangeProviderProps = {
  children: React.ReactNode;
};

const defaultContext = {
  minValue: 0,
  setMinValue: () => {},
  maxValue: 0,
  setMaxValue: () => {},
};

export const RangeContext = createContext<RangeContextType>(defaultContext);

export const RangeProvider = ({ children }: RangeProviderProps) => {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  return (
    <RangeContext.Provider
      value={{
        minValue,
        setMinValue,
        maxValue,
        setMaxValue,
      }}
    >
      {children}
    </RangeContext.Provider>
  );
};
