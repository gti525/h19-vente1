import React, { Component } from "react";
import ListeEvenements from "../../reutilisables/ListeEvenements.js";
import evenements from "../../../faussesDonnees/evenements.json";

class Spectacles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evenements: evenements
    };
  } 

  componentDidMount() {
    fetch(`/events`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => console.log(response))
    //.catch(error => {
    //  console.log(error)
    //})
  }

  render() {
    const { evenements } = this.state;
    return (
      <ListeEvenements evenements={evenements}/>
    );
  }
}

export default Spectacles;