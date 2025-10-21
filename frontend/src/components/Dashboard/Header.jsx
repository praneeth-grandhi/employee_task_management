import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className='text-2xl'>Hello</h1>
          <span className='text-3xl font-semibold'>{user?.name}</span>
          <p className='text-sm text-emerald-500 mt-1'>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
        </div>
        <button 
          onClick={handleLogout}
          className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium py-2 px-5 rounded transition-colors'
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
