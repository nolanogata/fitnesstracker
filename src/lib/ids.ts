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

export const stableIdWithHash = (prefix: string, parts: Array<string | number | undefined>) => {
  const source = parts
    .filter((part) => part !== undefined && part !== "")
    .join("|")
    .toLowerCase();
  const safe = encodeURIComponent(source).replace(/%/g, "").slice(0, 92);
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${prefix}_${safe}_${(hash >>> 0).toString(36)}`;
};
