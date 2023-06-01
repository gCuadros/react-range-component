import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

import { fetcher } from "api/fetcher";

import {
  fetchMinMaxRange,
  minMaxRangeKey,
  useMinMaxRange,
  FindMinMaxRange,
} from "./useMinMaxRange";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("api/fetcher", () => ({
  fetcher: jest.fn(),
}));

describe("useMinMaxRange", () => {
  it("debería llamar a useQuery con los argumentos correctos", () => {
    const mockResponse: FindMinMaxRange["response"] = {
      min: 0,
      max: 100,
    };

    (fetcher as jest.Mock).mockResolvedValue(mockResponse);

    renderHook(() => useMinMaxRange());

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: minMaxRangeKey(),
      queryFn: fetchMinMaxRange,
    });
  });
});
