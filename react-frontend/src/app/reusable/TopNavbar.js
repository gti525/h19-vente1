import React, { Component } from 'react';
import { Nav, NavDropdown, MenuItem, NavItem, Navbar} from 'react-bootstrap';

class TopNavbar extends Component {
  render() {
    return (
      <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                <a href="#brand">EventCo</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                <NavItem eventKey={1} href="/Accueil">
                    Accueil
                </NavItem>
                <NavItem eventKey={2} href="/Musique">
                    Musique
                </NavItem>
                <NavItem eventKey={3} href="/Sports">
                    Sports
                </NavItem>
                <NavItem eventKey={4} href="#">
                    Humour
                </NavItem>
                <NavItem eventKey={5} href="#">
                    Théâtre
                </NavItem>
                <NavDropdown eventKey={6} title="Panier" id="basic-nav-dropdown">
                    <MenuItem eventKey={6.1} href="/Visionner">Visionner</MenuItem>
                    <MenuItem eventKey={6.2}>Another action</MenuItem>
                    <MenuItem eventKey={6.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={6.4}>Separated link</MenuItem>
                </NavDropdown>
                </Nav>
                <Nav pullRight>
                <NavItem eventKey={7} href="#">
                    Connexion
                </NavItem>
                <NavItem eventKey={8} href="#">
                    Nous contacter
                </NavItem>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
      </div>
    );
  }
}

export default TopNavbar;
