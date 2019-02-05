import React, { Component } from "react";
import ListeEvenements from "../../reutilisables/ListeEvenements.js";
import evenements from "../../../faussesDonnees/evenements.json";

class Accueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evenements: evenements
    };
  }

  render() {
    const { evenements } = this.state;
    return (
      <ListeEvenements evenements={evenements}/>
    );
  }
}

export default Accueil;