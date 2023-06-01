import { CustomError } from "./error";

export const fetcher = async (url: string, init?: RequestInit) => {
  const res = await fetch(`https://demo3434971.mockable.io/${url}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const message = await res.json();
    throw new CustomError(message, res.status);
  }

  return res.json();
};
