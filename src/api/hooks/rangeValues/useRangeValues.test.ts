import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

import {
  useRangeValues,
  rangeValuesKey,
  fetchRangeValues,
} from "./useRangeValues";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("api/fetcher", () => ({
  fetcher: jest.fn(),
}));

describe("useRangeValues", () => {
  it("debería llamar a useQuery con los argumentos correctos", () => {
    renderHook(() => useRangeValues());

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: rangeValuesKey(),
      queryFn: fetchRangeValues,
    });
  });
});
