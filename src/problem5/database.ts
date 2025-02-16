import { Database } from "sqlite3";

export function initializeDatabase(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Test utilities
export const getTestDb = (): Database => {
  return new Database(":memory:", (err) => {
    if (err) {
      console.error("Error opening test database:", err);
    }
  });
};

export const initTestDb = (db: Database): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

export const clearTestDb = (db: Database): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM books", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
