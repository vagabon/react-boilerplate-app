export const deepEqual = (oldValue: unknown, newValue: unknown) => {
  return JSON.stringify(oldValue) === JSON.stringify(newValue);
};
