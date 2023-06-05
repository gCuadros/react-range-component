import { useContext } from "react";

import { RangeContext } from "./RangeContext";

export const useRangeContext = () => useContext(RangeContext);
