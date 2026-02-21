import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
    },

    level: Number,
    maxPlayers: Number,
    isPrivate: Boolean,
    topic: String,
    topicType: String,
    timeLimit: Number,
    language: String,
    difficulty: String,
    roomPassword: String,
    allowSpectators: Boolean,
    recordSession: Boolean,
    aiModeration: Boolean,
    category: String,

    participants: [
      {
        userId: String,
        name: String,
        joinedAt: Date,
        isHost: Boolean,
      },
    ],

    status: {
      type: String,
      default: "waiting", // waiting | active | finished
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
