PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  access_subject TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  disabled_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_records (
  user_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  payload_json TEXT,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  PRIMARY KEY (user_id, entity_type, entity_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS user_records_owner_type_idx
  ON user_records (user_id, entity_type, updated_at);

CREATE TABLE IF NOT EXISTS sync_changes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  payload_json TEXT,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS sync_changes_owner_cursor_idx
  ON sync_changes (user_id, id);

CREATE TRIGGER IF NOT EXISTS user_records_after_insert
AFTER INSERT ON user_records
BEGIN
  INSERT INTO sync_changes (
    user_id, entity_type, entity_id, payload_json, updated_at, deleted_at
  ) VALUES (
    NEW.user_id, NEW.entity_type, NEW.entity_id, NEW.payload_json, NEW.updated_at, NEW.deleted_at
  );
END;

CREATE TRIGGER IF NOT EXISTS user_records_after_update
AFTER UPDATE ON user_records
WHEN OLD.payload_json IS NOT NEW.payload_json
  OR OLD.updated_at IS NOT NEW.updated_at
  OR OLD.deleted_at IS NOT NEW.deleted_at
BEGIN
  INSERT INTO sync_changes (
    user_id, entity_type, entity_id, payload_json, updated_at, deleted_at
  ) VALUES (
    NEW.user_id, NEW.entity_type, NEW.entity_id, NEW.payload_json, NEW.updated_at, NEW.deleted_at
  );
END;

CREATE TABLE IF NOT EXISTS sync_devices (
  user_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  last_cursor INTEGER NOT NULL DEFAULT 0,
  last_seen_at TEXT NOT NULL,
  PRIMARY KEY (user_id, device_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS migration_runs (
  user_id TEXT NOT NULL,
  file_hash TEXT NOT NULL,
  record_count INTEGER NOT NULL,
  imported_at TEXT NOT NULL,
  PRIMARY KEY (user_id, file_hash),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS catalog_submissions (
  id TEXT PRIMARY KEY,
  submitter_user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
  menu_payload_json TEXT NOT NULL,
  evidence_type TEXT NOT NULL
    CHECK (evidence_type IN ('official_url', 'package_label', 'official_document', 'in_store_display')),
  source_url TEXT,
  evidence_object_key TEXT,
  evidence_sha256 TEXT,
  review_note TEXT,
  reviewed_by_user_id TEXT,
  reviewed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (submitter_user_id) REFERENCES users(id),
  FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS catalog_submissions_status_idx
  ON catalog_submissions (status, created_at);

CREATE TABLE IF NOT EXISTS shared_menu_items (
  id TEXT PRIMARY KEY,
  version INTEGER NOT NULL DEFAULT 1,
  menu_payload_json TEXT NOT NULL,
  evidence_type TEXT NOT NULL,
  source_url TEXT,
  evidence_label TEXT NOT NULL,
  verified_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE INDEX IF NOT EXISTS shared_menu_items_updated_idx
  ON shared_menu_items (updated_at, id);

CREATE TABLE IF NOT EXISTS ai_usage_daily (
  user_id TEXT NOT NULL,
  usage_date TEXT NOT NULL,
  feature TEXT NOT NULL,
  model TEXT NOT NULL,
  success_count INTEGER NOT NULL DEFAULT 0,
  failure_count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (user_id, usage_date, feature, model),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ai_result_cache (
  user_id TEXT NOT NULL,
  image_hash TEXT NOT NULL,
  response_json TEXT NOT NULL,
  model TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (user_id, image_hash),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (actor_user_id) REFERENCES users(id)
);
