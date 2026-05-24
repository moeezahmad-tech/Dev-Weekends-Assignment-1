import sqlite3 from "sqlite3";

type InitOptions = {
  filename?: string;
};

export type FoodItem = {
  name?: string;
  desc: string;
  price?: string;
  currency?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
};

let dbInstance: sqlite3.Database | null = null;

function openDatabase(filename: string): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(filename, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(db);
    });
  });
}

function run(db: sqlite3.Database, sql: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

async function initDb(options: InitOptions = {}): Promise<sqlite3.Database> {
  if (dbInstance) {
    return dbInstance;
  }

  const filename = options.filename ?? "./list.db";
  const db = await openDatabase(filename);

  await run(
    db,
    `CREATE TABLE IF NOT EXISTS FoodItem (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      desc TEXT NOT NULL,
      price TEXT,
      currency TEXT,
      image TEXT,
      created_at TEXT,
      updated_at TEXT
    )`
  );

  dbInstance = db;
  return db;
}

function getDb(): sqlite3.Database {
  if (!dbInstance) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return dbInstance;
}

function closeDb(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!dbInstance) {
      resolve();
      return;
    }
    dbInstance.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      dbInstance = null;
      resolve();
    });
  });
}

export { initDb, getDb, closeDb };