export const GAME_LEVELS = {
  STRUCTURED: 1,
  DYNAMIC: 2,
  FREEFLOW: 3
};

export const ROOM_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
};

export const GAME_STATUS = {
  WAITING: 'waiting',
  ACTIVE: 'active',
  FINISHED: 'finished'
};

export const USER_ROLES = {
  PLAYER: 'player',
  HOST: 'host',
  MODERATOR: 'moderator'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CREATE_ROOM: '/create-room',
  ROOMS: '/rooms',
  GAME: '/game/:id',
  PROFILE: '/profile',
  PRACTICE: '/practice'
};

export const COLORS = {
  gradients: {
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-cyan-500 to-blue-500',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-orange-500 to-red-500',
    info: 'from-blue-500 to-indigo-500'
  }
};

export const ANIMATIONS = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500
  },
  easings: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};