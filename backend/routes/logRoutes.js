import express from "express";
import { getLogs, createLog } from "../controllers/logController.js";
const router = express.Router();

/* POST /logs */
router.post("/", createLog);

/* GET /logs */
router.get("/", getLogs);

export default router;
