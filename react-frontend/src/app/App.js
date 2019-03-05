import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ACCUEIL, SPECTACLES, PANIER, FORM } from '../assistants/routes.js'; //Importer les constantes des path ici. Comme ça, il faut le modifier à un seul endroit.
import BarreNavigation from './reutilisables/BarreNavigation.js';
import Accueil from './sections/Accueil/Accueil.js'; //Importer le component HomePage pour l'utiliser.
import Spectacles from './sections/Spectacles/Spectacles.js';
import Panier from './sections/Panier/Panier.js';
import Form from './sections/Form/Form.js';


class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <BarreNavigation/>
          <Switch>
            <Route exact path={ACCUEIL} component={Accueil} />
            <Route path={SPECTACLES} component={Spectacles} />
            <Route path={PANIER} component={Panier} />
            <Route path={FORM} component={Form} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
