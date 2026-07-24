export type TimestampedSyncRecord = {
  updated_at: string;
};

export function recordsUpdatedAfter<T extends TimestampedSyncRecord>(records: T[], lastSyncedAt?: string): T[] {
  if (!lastSyncedAt || !Number.isFinite(Date.parse(lastSyncedAt))) return records;
  return records.filter((record) => record.updated_at > lastSyncedAt);
}
