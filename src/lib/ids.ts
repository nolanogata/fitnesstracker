export const makeId = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;

export const stableId = (prefix: string, parts: Array<string | number | undefined>) => {
  const source = parts
    .filter((part) => part !== undefined && part !== "")
    .join("|")
    .toLowerCase();
  const safe = encodeURIComponent(source).replace(/%/g, "").slice(0, 120);
  return `${prefix}_${safe}`;
};
