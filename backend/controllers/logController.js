import { readLogs, writeLogs } from "../utills/fileDb.js";
import filterLogs from "../utills/filterLogs.js";

export const createLog = async (req, res) => {
  try {
    const requiredFields = [
      "level",
      "message",
      "resourceId",
      "timestamp",
      "traceId",
      "spanId",
      "commit",
      "metadata"
    ];

    // Check required fields
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const { level, message, resourceId, timestamp, traceId, spanId, commit, metadata } = req.body;

    // Validate level
    const validLevels = ["error", "warn", "info", "debug"];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ error: `level must be one of: ${validLevels.join(", ")}` });
    }

    // Validate types
    if (typeof message !== "string" || typeof resourceId !== "string" ||
        typeof timestamp !== "string" || typeof traceId !== "string" ||
        typeof spanId !== "string" || typeof commit !== "string") {
      return res.status(400).json({ error: "Invalid field types. Strings expected for message, resourceId, timestamp, traceId, spanId, commit" });
    }

    // Validate timestamp format (basic ISO check)
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(timestamp)) {
      return res.status(400).json({ error: "timestamp must be in ISO 8601 format" });
    }

    // Validate metadata is object
    if (typeof metadata !== "object" || Array.isArray(metadata)) {
      return res.status(400).json({ error: "metadata must be a JSON object" });
    }

    const logs = await readLogs();
    logs.push(req.body);
    await writeLogs(logs);

    // Emit new log to connected clients
    const io = req.app.get('io');
    io.emit('newLog', req.body);

    res.status(201).json(req.body);
  } catch (err) {
    console.error('Error in createLog:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    let logs = await readLogs();

    logs = filterLogs(logs, req.query);

    logs.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    res.json(logs);
  } catch (err) {
    console.error('Error in getLogs:', err);
    res.status(500).json({ error: err.message });
  }
};