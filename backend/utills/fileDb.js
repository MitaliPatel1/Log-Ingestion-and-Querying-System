import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "../data/logs.json");

export const readLogs = () => {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
};

export const writeLogs = (logs) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(logs, null, 2));
};

export default {
  readLogs,
  writeLogs,
};