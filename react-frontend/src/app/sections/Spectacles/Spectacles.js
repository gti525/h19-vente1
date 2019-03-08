import React, { Component } from "react";
import ListeEvenements from "../../reutilisables/ListeEvenements.js";
//import evenements from "../../../faussesDonnees/evenements.json";

class Spectacles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      evenements: null
    };
  } 

  componentDidMount() {
    fetch(`http://localhost:4000/events`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      this.setState({ evenements: response.events, isLoading: false })
    })
    //.catch(error => {
    //  console.log(error)
    //})
  }

  render() {
    const { evenements, isLoading } = this.state;
    if(isLoading) {
      return null;
    }
    return (
      <ListeEvenements evenements={evenements}/>
    );
  }
}

export default Spectacles;