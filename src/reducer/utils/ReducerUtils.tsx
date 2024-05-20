export const deepEqual = (oldValue: unknown, newValue: unknown) => {
  try {
    return JSON.stringify(oldValue) === JSON.stringify(newValue);
  } catch (_) {
    return false;
  }
};
