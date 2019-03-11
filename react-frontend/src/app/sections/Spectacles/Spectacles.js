import React, { Component } from "react";
import ListeEvenements from "../../reutilisables/ListeEvenements.js";
import axios from "axios";

class Spectacles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      evenements: null
    };
  } 

  componentDidMount() {
    axios.get("https://sitevente1-serveur.herokuapp.com/events")
    .then(response => {
      console.log(response)
      this.setState({ evenements: response.events, isLoading: false })
    })
    /*fetch(`/events`, {
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
    */
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