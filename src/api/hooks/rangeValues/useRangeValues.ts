import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { fetcher } from "api/fetcher";

export interface FindRangeValues {
  response: {
    rangeValues: number[];
  };
}

export const rangeValuesKey = () =>
  [
    {
      id: "range-values",
      scope: "range",
      entity: "list",
    },
  ] as const;

export const fetchRangeValues = async ({
  queryKey: [{}],
}: QueryFunctionContext<ReturnType<typeof rangeValuesKey>>) => {
  const response: FindRangeValues["response"] = await fetcher("/range-values");
  return response.rangeValues;
};

export const useRangeValues = () =>
  useQuery({
    queryKey: rangeValuesKey(),
    queryFn: fetchRangeValues,
  });
