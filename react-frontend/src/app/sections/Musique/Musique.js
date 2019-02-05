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
    const evenementsMusique = evenements.filter(evenement => evenement.type === "musique");
    return (
      <ListeEvenements evenements={evenementsMusique}/>
    );
  }
}

export default Musique;