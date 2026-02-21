const API_BASE = "http://localhost:5000/api";

export const roomService = {
  createRoom: async (roomData) => {
    try {
      const res = await fetch(`${API_BASE}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create room");
      }

      return data;
    } catch (err) {
      console.error("Create room API error:", err);
      throw err;
    }
  },
};
