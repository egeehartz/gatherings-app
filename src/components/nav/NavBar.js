import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

//this component is responsible for the html rep of the NavBar
export const NavBar = () => {

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
              <NavLink href="/responsibilities">responsibilities</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/archive">archive</NavLink>
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
