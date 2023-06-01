import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { fetcher } from "api/fetcher";

export interface FindMinMaxRange {
  response: {
    min: number;
    max: number;
  };
}

export const minMaxRangeKey = () =>
  [
    {
      id: "min-max-range",
      scope: "range",
      entity: "list",
    },
  ] as const;

export const fetchMinMaxRange = async ({
  queryKey: [{}],
}: QueryFunctionContext<ReturnType<typeof minMaxRangeKey>>) => {
  const response: FindMinMaxRange["response"] = await fetcher("/min-max-range");
  return response;
};

export const useMinMaxRange = () =>
  useQuery({
    queryKey: minMaxRangeKey(),
    queryFn: fetchMinMaxRange,
  });
