import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ACCUEIL, SPECTACLES, PANIER } from '../assistants/routes.js'; //Importer les constantes des path ici. Comme ça, il faut le modifier à un seul endroit.
import BarreNavigation from './reutilisables/BarreNavigation.js';
import Accueil from './sections/Accueil/Accueil.js'; //Importer le component HomePage pour l'utiliser.
import Spectacles from './sections/Spectacles/Spectacles.js';
import Panier from './sections/Panier/Panier.js';

class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          {/*Le component Navbar est utilisé*/}
          <BarreNavigation/>
          {/*Switch sert à utiliser la première route qui match le "path". Dès qu'une Route est utilisée, les autres sont ignorées.*/}
          <Switch>
            {/*Dès que le "path match avec le URL, le component de la route est appelé*/}
            <Route exact path={ACCUEIL} component={Accueil} />
            <Route path={SPECTACLES} component={Spectacles} />
            <Route path={PANIER} component={Panier} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
