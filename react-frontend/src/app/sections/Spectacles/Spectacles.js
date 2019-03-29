import React, { Component } from "react";
import ListeEvenements from "../../reutilisables/ListeEvenements.js";
import SearchBar from '../SearchBar/SearchBar.js';
import { BounceLoader } from 'react-spinners';
import axios from "axios";
import "./Spectacles.css";

class Spectacles extends Component {
  constructor(props) {
    super(props);
    this.updateEvents = this.updateEvents.bind(this);
    this.state = {
      loading: true,
      evenements: null
    };
  } 

  componentDidMount() {
    axios.get("https://sitevente1-serveur.herokuapp.com/events")
    .then(response => {
      this.setState({ evenements: response.data.events, loading: false })
    })
  }

  updateEvents(newEvents) {
    console.log("in updateEvents")
    this.setState({ evenements: newEvents });
  }

  render() {
    const { evenements, loading } = this.state;
    if(loading) {
      return (
        <BounceLoader
          color={'#123abc'} 
          loading={this.state.loading}
        />
      )
    }
    return (
      <React.Fragment>
        <SearchBar updateEvents={this.updateEvents} />
        <ListeEvenements evenements={evenements}/>
        <div id="horizontal-analytic-banner" align="center"></div>
      </React.Fragment>
    );
    
  }
}

export default Spectacles;