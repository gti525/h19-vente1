import React, { Component } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { ACCUEIL, SPECTACLES, PANIER } from '../../assistants/routes';

class BarreNavigation extends Component {
  render() {
    return (
      <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href={ACCUEIL}>Site de vente 1</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                <NavItem eventKey={1} href={SPECTACLES}>
                    Spectacles
                </NavItem>
                <NavItem eventKey={7} href={PANIER}>
                    Panier
                </NavItem>
                <NavItem eventKey={9} href="/Form">
                    Formulaire paiement
                </NavItem>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
      </div>
    );
  }
}

export default BarreNavigation;
