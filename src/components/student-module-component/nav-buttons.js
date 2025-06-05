import "../../styles/student-component-styles/nav-buttons.css";
import { Link ,useLocation} from 'react-router-dom';
import { useState } from "react";

function NavButtons(){
    const location = useLocation();
   const isActive = (path) => location.pathname.startsWith(path) ? "nav-link active" : "nav-link";

    const [selectedYear, setSelectedYear] = useState('2024-2025'); // State for year selection
    return(
        

        <div>
        {/* Navbar and year-select in a flex row */}
            <div className="nav-and-year-container">
                <nav className="navbar">
                    <div className="nav-links">
                        <Link to="/student" className={isActive('/student')}>Student Profile</Link>
                        <Link to="/payments" className={isActive('/payments')}>Payments</Link>
                        <Link to="/receipts" className={isActive('/receipts')}>Receipts</Link>
                        <Link to="/transport" className={isActive('/transport')}>Transport</Link>
                        <Link to="/academics" className={isActive('/academics')}>Academics</Link>
                        <Link to="/alerts" className={isActive('/alerts')}>Alerts</Link>
                        <Link to="/history" className={isActive('/history')}>History</Link>
                        <Link to="/room-allotment" className={isActive('/room-allotment')}>Room Allotment</Link>
                    </div>
                </nav>
                <select
                    className="year-select"
                    aria-label="Select academic year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                </select>
            </div>
            </div>
    );
}
export default NavButtons;