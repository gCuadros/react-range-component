import { Query, QueryCache, QueryClient } from "@tanstack/react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000 * 24,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      notifyOnChangeProps: "all",
    },
  },
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      if (error.status === 401) {
        client.resetQueries({
          predicate: (query: Query<any, any, any, any>) =>
            query.queryKey[0].isPrivate,
        });
      }

      if (query.state.data !== undefined) {
        console.log({
          title: "Algo falló",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
  }),
});
