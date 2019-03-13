import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ACCUEIL, SPECTACLES, PANIER, FORM } from '../assistants/routes.js'; //Importer les constantes des path ici. Comme ça, il faut le modifier à un seul endroit.
import BarreNavigation from './reutilisables/BarreNavigation.js';
import Accueil from './sections/Accueil/Accueil.js'; //Importer le component HomePage pour l'utiliser.
import Spectacles from './sections/Spectacles/Spectacles.js';
import Panier from './sections/Panier/Panier.js';
import Form from './sections/Form/Form.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.loadBanner();
  }
  loadBanner() {
    // eslint-disable-next-line
    document.addEventListener("DOMContentLoaded",function(){const e="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyLCJpYXQiOjE1NTE2NjQyMDh9.vYKwtAGtaxGMSN0qp3kOTo6k3Ccc2B9NzFBMpZ8CUPU";const t=function(){if("undefined"!=typeof Storage&&localStorage.getItem("gti525analytic")){const e=JSON.parse(localStorage.getItem("gti525analytic"));if(new Date(e.expiration).getTime()>(new Date).getTime())return e.clientId}return}();t?function(t){let n=new XMLHttpRequest;n.open("GET","https://gti525-analitycs.herokuapp.com/api/v1/banners/code",!0),n.onload=function(o){4===n.readyState&&200===n.status&&Function(`return (${n.responseText})`)()(t,e)},n.setRequestHeader("x-access-token",e),n.send()}(t):function(){let t=new XMLHttpRequest;t.open("GET","https://gti525-analitycs.herokuapp.com/api/v1/analytics/code",!0),t.onload=function(n){4===t.readyState&&200===t.status&&Function(`return (${t.responseText})`)()(e)},t.setRequestHeader("x-access-token",e),t.send()}()},!1);
  }


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
