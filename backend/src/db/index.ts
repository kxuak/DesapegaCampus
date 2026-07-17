import fs from "node:fs";
import path from "node:path";
import initSqlJs, { Database as SqlJsDatabase } from "sql.js";

const DB_PATH = process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "app.sqlite");

let sqlDb: SqlJsDatabase | null = null;

function ensureDbDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function persist() {
  if (!sqlDb) return;
  ensureDbDir();
  const data = sqlDb.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

export async function initDb() {
  const SQL = await initSqlJs();

  ensureDbDir();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    sqlDb = new SQL.Database(fileBuffer);
  } else {
    sqlDb = new SQL.Database();
  }

  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  sqlDb.run(schema);

  persist();
}

function getDb(): SqlJsDatabase {
  if (!sqlDb) {
    throw new Error("Banco de dados não inicializado. Chame initDb() antes de usar o db.");
  }
  return sqlDb;
}

type Params = Record<string, unknown> | undefined;

export function run(sql: string, params?: Params) {
  const database = getDb();
  database.run(sql, params as never);
  persist();
}

export function get<T = Record<string, unknown>>(sql: string, params?: Params): T | undefined {
  const database = getDb();
  const stmt = database.prepare(sql);
  try {
    if (params) stmt.bind(params as never);
    if (stmt.step()) {
      return stmt.getAsObject() as T;
    }
    return undefined;
  } finally {
    stmt.free();
  }
}

export function all<T = Record<string, unknown>>(sql: string, params?: Params): T[] {
  const database = getDb();
  const stmt = database.prepare(sql);
  const results: T[] = [];
  try {
    if (params) stmt.bind(params as never);
    while (stmt.step()) {
      results.push(stmt.getAsObject() as T);
    }
    return results;
  } finally {
    stmt.free();
  }
}