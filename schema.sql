-- รันครั้งเดียวใน Cloudflare D1 console
CREATE TABLE IF NOT EXISTS events (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  ts      TEXT    NOT NULL DEFAULT (datetime('now')),
  day     TEXT    NOT NULL DEFAULT (date('now','+7 hours')),
  vid     TEXT    NOT NULL,
  src     TEXT    NOT NULL,
  type    TEXT    NOT NULL,   -- view | click
  target  TEXT    NOT NULL DEFAULT '',
  country TEXT    NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_events_src  ON events(src, type);
CREATE INDEX IF NOT EXISTS idx_events_day  ON events(day);
