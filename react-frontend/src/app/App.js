import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HOMEPAGE, ACCUEIL, MUSIQUE, SPORTS, VISIONNER } from '../helpers/routes.js'; //Importer les constantes des path ici. Comme ça, il faut le modifier à un seul endroit.
import TopNavbar from './reusable/TopNavbar.js';
import HomePage from './sections/HomePage/HomePage.js'; //Importer le component HomePage pour l'utiliser.
import Musique from './sections/Musique/Musique.js';
import Sports from './sections/Sports/Sports.js';
import Visionner from './sections/Visionner/Visionner.js';

class App extends Component {
  
  render() {
    return (
      // Défini qu'il y a un routeur ici
      <Router>
        <div>
          {/*Le component Navbar est utilisé*/}
          <TopNavbar/>
          {/*Switch sert à utiliser la première route qui match le "path". Dès qu'une Route est utilisée, les autres sont ignorées.*/}
          <Switch>
            {/*Dès que le "path match avec le URL, le component de la route est appelé*/}
            <Route exact path={HOMEPAGE} component={HomePage} />
            <Route path={ACCUEIL} component={HomePage} />
            <Route path={MUSIQUE} component={Musique} />
            <Route path={SPORTS} component={Sports} />
            <Route path={VISIONNER} component={Visionner} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
