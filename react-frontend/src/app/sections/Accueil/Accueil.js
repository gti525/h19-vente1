import React, { Component, Fragment } from "react";
import "./Accueil.css";

class Accueil extends Component {

  render() {
    return (
      <Fragment>
        <div className="accueil_en_tete">
          <h4>Simple. Rapide</h4>
          <h1>Vente de billets en ligne</h1>
          <h3>Pour tous vos événements</h3>
        </div>
        <div className="message">
          <h1>Mais quel site incroyable !</h1>
        </div>

        <div id="horizontal-analytic-banner"></div>
        <div id="mobile-analytic-banner"></div>
        
      </Fragment>
    );
  }
}

export default Accueil;