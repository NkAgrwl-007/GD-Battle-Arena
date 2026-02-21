import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ BOOTSTRAP (restore session)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');

      if (storedUser && token) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Auth bootstrap failed:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const userData = await authService.login(email, password);

      if (!userData || !userData.user) {
        throw new Error('Invalid login response');
      }

      // 🔥 IMPORTANT — backend shape
      setUser(userData.user);
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(userData.user));
      localStorage.setItem('authToken', userData.token);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ REGISTER
  const register = async (payload) => {
    setIsLoading(true);

    try {
      const data = await authService.register(payload);

      if (!data || !data.user) {
        throw new Error('Invalid register response');
      }

      setUser(data.user);
      setIsAuthenticated(true);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('authToken', data.token);

      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem('user');
    localStorage.removeItem('authToken');

    authService.logout?.();
  };

  // ✅ MEMO VALUE
  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      login,
      register,
      logout
    }),
    [user, isLoading, isAuthenticated]
  );

  // ✅ Prevent flicker ONLY on first load
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};