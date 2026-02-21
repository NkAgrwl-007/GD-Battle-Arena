import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 🔐 attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("gd_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // ================= LOGIN =================
  login: async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // ✅ store
      localStorage.setItem("gd_token", token);
      localStorage.setItem("gd_user", JSON.stringify(user));

      return user;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Login failed"
      );
    }
  },

  // ================= REGISTER =================
  register: async (userData) => {
    try {
      const res = await api.post("/auth/register", userData);

      const { token, user } = res.data;

      // ✅ store
      localStorage.setItem("gd_token", token);
      localStorage.setItem("gd_user", JSON.stringify(user));

      return user;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Registration failed"
      );
    }
  },

  // ================= LOGOUT =================
  logout: () => {
    localStorage.removeItem("gd_token");
    localStorage.removeItem("gd_user");
  },

  // ================= REFRESH =================
  refreshToken: async () => {
    try {
      const res = await api.post("/auth/refresh");
      const { token } = res.data;
      localStorage.setItem("gd_token", token);
      return token;
    } catch (err) {
      throw new Error("Token refresh failed");
    }
  },

  // ================= CURRENT USER =================
  getCurrentUser: () => {
    const user = localStorage.getItem("gd_user");
    return user ? JSON.parse(user) : null;
  },
};
