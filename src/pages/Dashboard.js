import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/'));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome to NutriLINE</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Log Out
        </button>
      </header>

      <div className="space-y-4">
        <button
          onClick={() => navigate('/plan')}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Plan a Meal
        </button>
        <button
          onClick={() => navigate('/check')}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Check a Dish
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
