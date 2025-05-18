import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Dashboard.css';


const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/'));
  };

  return (
    <div>
      <div className="title-section" >
        <h1 class="font-mono">Welcome to NutriLINE</h1>
      </div>

      <Link to="/profile">View Profile</Link>


  
    </div>
  );
};

export default Dashboard;
