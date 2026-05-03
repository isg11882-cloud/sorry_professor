export const MIN_SIZE_KB = 10;
export const MAX_SIZE_KB = 51200;

export function normalizeSizeKb(value: number) {
  if (!Number.isFinite(value)) return MIN_SIZE_KB;

  return Math.min(MAX_SIZE_KB, Math.max(MIN_SIZE_KB, Math.round(value)));
}
