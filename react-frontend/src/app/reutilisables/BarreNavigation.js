import React, { Component } from 'react';
import { Nav, NavItem, Navbar} from 'react-bootstrap';

class BarreNavigation extends Component {
  render() {
    return (
      <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">EventCo</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                <NavItem eventKey={1} href="/Musique">
                    Musique
                </NavItem>
                <NavItem eventKey={2} href="/Sports">
                    Sports
                </NavItem>
                <NavItem eventKey={3} href="#">
                    Humour
                </NavItem>
                <NavItem eventKey={4} href="#">
                    Théâtre
                </NavItem>
                </Nav>
                <Nav pullRight>
                <NavItem eventKey={7} href="/Panier">
                    Panier
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

export default BarreNavigation;
