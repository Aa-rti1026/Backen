import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve("data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "portfolio.db");
const db = new Database(DB_PATH);

// Initialize if schema not present
const row = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='profile'")
  .get();

if (!row) {
  const schema = fs.readFileSync(path.resolve("backend/schema.sql"), "utf8");
  db.exec(schema);

  const seed = fs.readFileSync(path.resolve("backend/seed.sql"), "utf8");
  db.exec(seed);
}

export default db;
