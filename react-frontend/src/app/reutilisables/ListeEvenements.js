import React, { Component } from "react";
import Evenement from "../sections/Evenement/Evenement.js";
import AjoutBillet from "./AjoutBillet.js";

class ListeEvenements extends Component {
  constructor(props) {
    super(props);
    this.state = {
        evenementOuvert: null
    }
    this.ouvrirAchatBillet = this.ouvrirAchatBillet.bind(this);
    this.fermerAchatBillet = this.fermerAchatBillet.bind(this);
  }

  ouvrirAchatBillet(index) {
    this.setState({ evenementOuvert: this.props.evenements[index] })
  }

  fermerAchatBillet() {
    this.setState({ evenementOuvert: null })
  }

  render() {
    const { evenements } = this.props;
    const { evenementOuvert } = this.state;
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Nom</th>
              <th scope="col">Date</th>
              <th scope="col">Lieu</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEvenements(evenements)}
          </tbody>
        </table>
        {evenementOuvert && <AjoutBillet evenementOuvert={this.state.evenementOuvert} fermerAchatBillet={() => this.fermerAchatBillet()}/>} {/*Si ajoutBilletOuvert === true, render le component AjoutBillet*/}
      </div>
    );
  }

  renderEvenements = (evenements) => {
    return (
      Object.keys(evenements).map((key) => (
        <Evenement key={key} index={key} {...evenements[key]} ouvrirAchatBillet={this.ouvrirAchatBillet}/>
      ))
    );
  }
}

export default ListeEvenements;