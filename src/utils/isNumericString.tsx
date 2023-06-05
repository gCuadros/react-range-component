export const isNumericString = (value: string): boolean => {
  const numericRegex = /^[0-9]+$/;
  return numericRegex.test(value);
};
