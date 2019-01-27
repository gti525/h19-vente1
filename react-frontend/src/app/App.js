import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HOMEPAGE } from '../helpers/routes.js'; //Importer les constantes des path ici. Comme ça, il faut le modifier à un seul endroit.
import TopNavbar from './reusable/TopNavbar.js';
import HomePage from './sections/HomePage/HomePage.js'; //Importer le component HomePage pour l'utiliser.

class App extends Component {
  render() {
    return (
      // Défini qu'il y a un routeur ici
      <Router>
        <div>
          {/*Le component Navbar est utilisé*/}
          <TopNavbar />
          {/*Switch sert à utiliser la première route qui match le "path". Dès qu'une Route est utilisée, les autres sont ignorées.*/}
          <Switch>
            {/*Dès que le "path match avec le URL, le component de la route est appelé*/}
            <Route path={HOMEPAGE} component={HomePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
