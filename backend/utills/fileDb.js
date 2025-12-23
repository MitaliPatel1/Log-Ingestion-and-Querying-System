import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "../data/logs.json");

export const readLogs = async () => {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify([]));
  }
  const data = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(data);
};

export const writeLogs = async (logs) => {
  await fs.writeFile(DB_PATH, JSON.stringify(logs, null, 2));
};

export default {
  readLogs,
  writeLogs,
};