import { Link } from 'react-router-dom';
const NavbarHeading = () => {    
    return ( 
        <header>
            <nav>
            <ul className="navbar-items">
                <li className="navbar-item-list">
                <Link to="/signin">Signin</Link>
                </li>
                <li className="navbar-item-list">
                <Link to="/offers">Offers</Link>
                </li>
                <li className="navbar-item-list">
                <Link to="/profile">Profile</Link>
                </li>
            </ul>
            </nav>
        </header>
     );
}
 
export default NavbarHeading;