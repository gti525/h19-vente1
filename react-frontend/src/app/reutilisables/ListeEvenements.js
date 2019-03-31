import React, { Component } from "react";
import Evenement from "../sections/Evenement/Evenement.js";
import AjoutBillet from "../sections/AjoutBillet/AjoutBillet.js";
import DetailsEvenement from "./DetailsEvenement.js";

class ListeEvenements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evenementDetailOuvert: null,
      evenementAchatOuvert: null
    }
    this.ouvrirDetailEvenement = this.ouvrirDetailEvenement.bind(this);
    this.fermerDetailEvenement = this.fermerDetailEvenement.bind(this);
    this.ouvrirAchatBillet = this.ouvrirAchatBillet.bind(this);
    this.fermerAchatBillet = this.fermerAchatBillet.bind(this);
  }

  ouvrirDetailEvenement(index) {
    this.setState({ evenementDetailOuvert: this.props.evenements[index] })
  }
  fermerDetailEvenement() {
    this.setState({ evenementDetailOuvert: null })
  }
  ouvrirAchatBillet(index) {
    this.setState({ evenementAchatOuvert: this.props.evenements[index] })
  }
  fermerAchatBillet() {
    this.setState({ evenementAchatOuvert: null })
  }

  render() {
    const { evenements } = this.props;
    const { evenementDetailOuvert, evenementAchatOuvert } = this.state;
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"/>
              <th scope="col">Titre</th>
              <th scope="col">Date</th>
              <th scope="col">Lieu</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEvenements(evenements)}
          </tbody>
        </table>
        {evenementDetailOuvert && <DetailsEvenement evenementDetailOuvert={this.state.evenementDetailOuvert} fermerDetailEvenement={() => this.fermerDetailEvenement()}/>} 
        {evenementAchatOuvert && <AjoutBillet evenementAchatOuvert={this.state.evenementAchatOuvert} fermerAchatBillet={() => this.fermerAchatBillet()}/>} 
      </div>
    );
  }

  renderEvenements = (evenements) => {
    return (
      Object.keys(evenements).map((key) => (
        <Evenement
        key={key}
        index={key}
        {...evenements[key]}
        ouvrirDetailEvenement={this.ouvrirDetailEvenement}
        ouvrirAchatBillet={this.ouvrirAchatBillet}
        />
      ))
    );
  }
}

export default ListeEvenements;