import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ACCUEIL, MUSIQUE, SPORTS, PANIER, FORM } from '../assistants/routes.js'; //Importer les constantes des path ici. Comme ça, il faut le modifier à un seul endroit.
import BarreNavigation from './reutilisables/BarreNavigation.js';
import Accueil from './sections/Accueil/Accueil.js'; //Importer le component HomePage pour l'utiliser.
import Musique from './sections/Musique/Musique.js';
import Sports from './sections/Sports/Sports.js';
import Panier from './sections/Panier/Panier.js';
import Form from './sections/Form/Form.js';


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
            <Route path={MUSIQUE} component={Musique} />
            <Route path={SPORTS} component={Sports} />
            <Route path={PANIER} component={Panier} />
            <Route path={FORM} component={Form} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
