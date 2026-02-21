import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Zap, Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, register, isLoading, isAuthenticated } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ✅ Navigation
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // ✅ Real-time validation
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      
      case 'password':
        if (!value.trim()) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (isSignUp && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return '';
      
      case 'username':
        if (isSignUp) {
          if (!value.trim()) return 'Username is required';
          if (value.length < 3) return 'Username must be at least 3 characters';
          if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        }
        return '';
      
      default:
        return '';
    }
  };

  // ✅ Handle input change with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate if field was touched
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  // ✅ Handle blur (mark as touched)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  // ✅ Validate all fields
  const validateForm = () => {
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };

    if (isSignUp) {
      newErrors.username = validateField('username', formData.username);
    }

    setErrors(newErrors);
    setTouched({ email: true, password: true, username: true });

    return !Object.values(newErrors).some(error => error);
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    const email = formData.email.trim();
    const password = formData.password.trim();
    const username = formData.username.trim();

    try {
      const result = isSignUp
        ? await register({ email, password, username })
        : await login(email, password);

      if (result.success) {
        toast.success(
          isSignUp ? '🎉 Account created successfully!' : '👋 Welcome back!'
        );
      } else {
        toast.error(result.error || 'Authentication failed');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error('Auth error:', err);
    }
  };

  // ✅ Switch between sign in/up
  const handleTabSwitch = (signUp) => {
    setIsSignUp(signUp);
    setErrors({});
    setTouched({});
  };

  // ✅ Check if form is valid
  const isFormValid = () => {
    if (isSignUp) {
      return formData.email && formData.password && formData.username &&
             !errors.email && !errors.password && !errors.username;
    }
    return formData.email && formData.password && !errors.email && !errors.password;
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">

        {/* LEFT — PROMO */}
        <div className="auth-promo">
          <h2>Speak. Compete. Improve.</h2>

          <p>
            GD Battle Arena helps you master group discussions with
            AI-powered feedback, real-time scoring, and competitive rooms.
          </p>

          <ul>
            <li>🚀 AI speech analysis & real-time feedback</li>
            <li>🎯 Smart scoring based on content & delivery</li>
            <li>🏆 Competitive arenas with live rankings</li>
            <li>📈 Detailed performance insights & trends</li>
            <li>🎓 Structured learning paths for all levels</li>
          </ul>
        </div>

        {/* RIGHT — AUTH CARD */}
        <div className="auth-card">

          {/* LOGO */}
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <Zap size={28} />
            </div>

            <h1 className="heading-card">GD Battle Arena</h1>
            <p className="text-tertiary text-sm">
              Master the art of group discussions
            </p>
          </div>

          {/* TABS */}
          <div className="auth-tabs">
            <div
              className={`auth-tab ${!isSignUp ? 'active' : ''}`}
              onClick={() => handleTabSwitch(false)}
            >
              Sign In
            </div>

            <div
              className={`auth-tab ${isSignUp ? 'active' : ''}`}
              onClick={() => handleTabSwitch(true)}
            >
              Sign Up
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="auth-form">

            {/* USERNAME (Sign Up only) */}
            {isSignUp && (
              <div className="auth-input-group">
                <div className="auth-input-wrapper">
                  <User className="auth-input-icon" size={18} />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className={`auth-input auth-input-with-icon ${
                      touched.username && errors.username ? 'auth-input-error' : ''
                    } ${touched.username && !errors.username && formData.username ? 'auth-input-success' : ''}`}
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                  {touched.username && !errors.username && formData.username && (
                    <CheckCircle className="auth-input-status-icon text-emerald-500" size={18} />
                  )}
                  {touched.username && errors.username && (
                    <AlertCircle className="auth-input-status-icon text-rose-500" size={18} />
                  )}
                </div>
                {touched.username && errors.username && (
                  <p className="auth-input-error-text">{errors.username}</p>
                )}
              </div>
            )}

            {/* EMAIL */}
            <div className="auth-input-group">
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={`auth-input auth-input-with-icon ${
                    touched.email && errors.email ? 'auth-input-error' : ''
                  } ${touched.email && !errors.email && formData.email ? 'auth-input-success' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  autoComplete="email"
                />
                {touched.email && !errors.email && formData.email && (
                  <CheckCircle className="auth-input-status-icon text-emerald-500" size={18} />
                )}
                {touched.email && errors.email && (
                  <AlertCircle className="auth-input-status-icon text-rose-500" size={18} />
                )}
              </div>
              {touched.email && errors.email && (
                <p className="auth-input-error-text">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD WITH EYE */}
            <div className="auth-input-group">
              <div className="auth-password-wrapper">
                <Lock className="auth-input-icon" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={`auth-input auth-input-password auth-input-with-icon ${
                    touched.password && errors.password ? 'auth-input-error' : ''
                  } ${touched.password && !errors.password && formData.password ? 'auth-input-success' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="auth-input-error-text">{errors.password}</p>
              )}
              {isSignUp && !errors.password && formData.password && (
                <div className="auth-password-strength">
                  <div className="auth-password-strength-bar">
                    <div 
                      className={`auth-password-strength-fill ${
                        formData.password.length < 6 ? 'weak' :
                        formData.password.length < 10 ? 'medium' : 'strong'
                      }`}
                      style={{
                        width: `${Math.min((formData.password.length / 12) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-tertiary mt-1">
                    {formData.password.length < 6 ? 'Weak password' :
                     formData.password.length < 10 ? 'Medium strength' : 'Strong password'}
                  </p>
                </div>
              )}
            </div>

            {/* FORGOT PASSWORD (Sign In only) */}
            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  onClick={() => toast('Password reset feature coming soon!')}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className="auth-submit"
            >
              {isLoading ? (
                <LoadingSpinner text="Processing..." />
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>

          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-tertiary text-sm">
              {isSignUp
                ? 'Already have an account?'
                : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => handleTabSwitch(!isSignUp)}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                disabled={isLoading}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* DEMO CREDENTIALS (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-elevated rounded-xl border border-subtle">
              <p className="text-xs text-tertiary mb-1">Demo credentials:</p>
              <p className="text-xs text-secondary font-mono">demo@example.com / Demo123!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;