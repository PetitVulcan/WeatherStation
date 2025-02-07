import { NavLink } from 'react-router-dom';
import '../../styles/Navigation.css';

const Navigation = () => {
    return (
      <nav className="space-y-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-lg ${isActive ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-600 hover:text-white'}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/logs" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-lg ${isActive ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-600 hover:text-white'}`
          }
        >
          Logs
        </NavLink>
        <NavLink 
          to="/stats" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-lg ${isActive ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-600 hover:text-white'}`
          }
        >
          Statistiques
        </NavLink>
      </nav>
    );
  };
  
  export default Navigation;