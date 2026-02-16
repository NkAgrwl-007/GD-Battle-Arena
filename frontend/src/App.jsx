import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthLayout from './components/Layout/AuthLayout';
import MainLayout from './components/Layout/MainLayout';
import LoginForm from './components/Auth/LoginForm';
import MainDashboard from './components/Dashboard/MainDashboard';
import CreateRoom from './components/Room/CreateRoom';
import LandingPage from './components/Dashboard/LandingPage';
// import RoomList from './components/Room/RoomList';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      {/* <Router> */}
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthLayout><LoginForm /></AuthLayout>} />
            <Route path="/login" element={<AuthLayout><LoginForm /></AuthLayout>} />
            <Route path="/dashboard" element={<MainLayout><MainDashboard /></MainLayout>} />
            <Route path="/landing" element={<MainLayout><LandingPage /></MainLayout>} />
            <Route path="/create-room" element={<MainLayout><CreateRoom /></MainLayout>} />
            {/* <Route path="/rooms" element={<MainLayout><RoomList /></MainLayout>} /> */}
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              },
            }}
          />
        </div>
      {/* </Router> */}
    </AuthProvider>
  );
}

export default App;