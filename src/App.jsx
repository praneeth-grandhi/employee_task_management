import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

const PrivateRoute = ({ element, allowedRole }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#111]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  // If role doesn't match, redirect to appropriate dashboard
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />;
  }

  // All checks passed, render the protected component
  return element;
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-[#111]">
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? 
                <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace /> : 
                <Login />
            } 
          />
          <Route
            path="/admin"
            element={<PrivateRoute element={<AdminDashboard />} allowedRole="admin" />}
          />
          <Route
            path="/employee"
            element={<PrivateRoute element={<EmployeeDashboard />} allowedRole="employee" />}
          />
          <Route
            path="/"
            element={
              <Navigate to={user ? (user.role === 'admin' ? '/admin' : '/employee') : '/login'} replace />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
