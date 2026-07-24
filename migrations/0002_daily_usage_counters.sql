CREATE TABLE IF NOT EXISTS daily_usage_counters (
  scope TEXT NOT NULL,
  usage_date TEXT NOT NULL,
  feature TEXT NOT NULL,
  usage_count INTEGER NOT NULL DEFAULT 0 CHECK (usage_count >= 0),
  updated_at TEXT NOT NULL,
  PRIMARY KEY (scope, usage_date, feature)
);

CREATE INDEX IF NOT EXISTS daily_usage_counters_date_idx
  ON daily_usage_counters (usage_date, feature);
