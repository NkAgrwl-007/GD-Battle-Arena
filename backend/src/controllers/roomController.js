import { nanoid } from "nanoid";
import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const roomCode = nanoid(6).toUpperCase();

    const room = await Room.create({
      roomCode,
      ...req.body,
      participants: [],
      status: "waiting",
    });

    return res.status(201).json({
      success: true,
      room,
    });
  } catch (err) {
    console.error("Create room error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create room",
    });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const { userId, name } = req.body;

    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (room.participants.length >= room.maxPlayers) {
      return res.status(400).json({
        success: false,
        message: "Room is full",
      });
    }

    // prevent duplicate join
    const alreadyJoined = room.participants.find(
      (p) => p.userId === userId
    );

    if (!alreadyJoined) {
      room.participants.push({
        userId,
        name,
        joinedAt: new Date(),
        isHost: room.participants.length === 0,
      });

      await room.save();
    }

    res.json({
      success: true,
      room,
    });
  } catch (err) {
    console.error("Join room error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to join room",
    });
  }
};
