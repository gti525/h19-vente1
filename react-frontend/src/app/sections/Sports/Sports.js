import React, { Component } from "react";
import ListeEvenements from "../../reutilisables/ListeEvenements.js";
import evenements from "../../../faussesDonnees/evenements.json";

class Sports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evenements: evenements
    };
  }

  render() {
    const { evenements } = this.state;
    const evenementsSports = evenements.filter(evenement => evenement.type === "musique");
    return (
      <ListeEvenements evenements={evenementsSports}/>
    );
  }
}

export default Sports;