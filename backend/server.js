import express from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import logRoutes from "./routes/logRoutes.js";

dotenv.config()

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use("/logs", logRoutes);

// Make io available to routes
app.set('io', io);

// Watch for changes in logs.json
const logsFilePath = path.join(process.cwd(), 'data', 'logs.json');
fs.watch(logsFilePath, (eventType) => {
  if (eventType === 'change') {
    io.emit('logsUpdated');
  }
});

server.listen(process.env.PORT , () =>
  console.log("Backend running at http://localhost:5000")
);
