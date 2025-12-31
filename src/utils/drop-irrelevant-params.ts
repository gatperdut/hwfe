export const dropIrrelevantParams = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== null && value !== '' && value !== undefined)
  ) as Partial<T>;
