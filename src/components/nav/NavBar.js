// import "./NavBar.css"

// export const NavBar = (props) => {
//     return (
//         <ul className="navbar">
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/home">Profile Page</Link>
//             </li>
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/logout">Logout</Link>
//             </li>
//         </ul>
//     )
// }

import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">gatherings</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/home">profile page</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/logout">logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
