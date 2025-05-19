import { Link } from 'react-router-dom';
import '.components/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">NutriLINE</h2>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/plan">Plan a Meal</Link></li>
        <li><Link to="/check">Identify Dish</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
