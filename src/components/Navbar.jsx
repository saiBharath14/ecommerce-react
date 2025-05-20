import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount, onCartClick, onFilterChange }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>MyStore</div>
      
      <div className="navbar-center">
        <div className="nav-links">
          
      
        </div>
      </div>

      <div className="navbar-actions">
        <button className="cart-btn" onClick={onCartClick}>
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;