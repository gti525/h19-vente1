import React, { Component } from "react";
import ListeEvenements from "../../reutilisables/ListeEvenements.js";
import evenements from "../../../faussesDonnees/evenements.json";

class Musique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evenements: evenements
    };
  } 

  render() {
    const { evenements } = this.state;
    const evenementsMusique = this.filtrerEvenementMusique(evenements);
    return (
      <ListeEvenements evenements={evenementsMusique}/>
    );
  }

  filtrerEvenementMusique = (evenements) => {
    return evenements.filter(evenement => evenement.type === "musique");
  }
}

export default Musique;