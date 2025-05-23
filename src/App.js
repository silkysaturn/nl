import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Survey from './pages/Survey';
import CheckDish from './pages/CheckDish';
import PlanMeal from './pages/PlanMeal';
import Profile from './pages/Profile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/check" element={<CheckDish />} />
        <Route path="/plan" element={<PlanMeal />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
