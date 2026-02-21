import express from "express";
import { createRoom, joinRoom } from "../controllers/roomController.js";

const router = express.Router();

router.post("/", createRoom);
router.post("/:roomCode/join", joinRoom);

export default router;
