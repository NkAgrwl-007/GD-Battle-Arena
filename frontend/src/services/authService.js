// Simulated authentication service
const API_BASE_URL = 'http://localhost:5000/api'; // Replace with actual API URL

export const authService = {
  login: async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate different user scenarios
    if (email === 'demo@gdArena.com') {
      return {
        id: 1,
        username: 'ArenaChampion',
        email: email,
        level: 25,
        totalGames: 147,
        winRate: 78,
        averageScore: 85.4,
        avatar: null,
        createdAt: new Date().toISOString()
      };
    }
    
    // Default successful login
    return {
      id: 2,
      username: 'DiscussionMaster',
      email: email,
      level: 12,
      totalGames: 45,
      winRate: 65,
      averageScore: 76.8,
      avatar: null,
      createdAt: new Date().toISOString()
    };
  },

  register: async (userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      id: 3,
      username: userData.username,
      email: userData.email,
      level: 1,
      totalGames: 0,
      winRate: 0,
      averageScore: 0,
      avatar: null,
      createdAt: new Date().toISOString()
    };
  },

  logout: () => {
    // Clear any stored tokens/data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  refreshToken: async () => {
    // Implement token refresh logic
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token found');
    
    // Make API call to refresh token
    // Return new token
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};