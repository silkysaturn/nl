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
    <>
      <div className="title-section" >

        <div className="title-text">

          <h1>Welcome to NutriLINE</h1>

          <h3>Healthy eating made simple.</h3> 
          <p>Personalized nutrition app that helps users identify ingredients and manage dietary restrictions.</p>

        </div>
       
      </div>

      <div className="profile-dash" onClick={() => navigate('/profile')} >
        Visit your profile
      </div>

      <div className="plan-a-meal" onClick={() => navigate('/plan')}>
      Plan a Meal
      </div>

      <div className="check-a-meal" onClick={() => navigate('/check')}>
        Check Your Meals
      </div>


    </>
  );
};

export default Dashboard;
