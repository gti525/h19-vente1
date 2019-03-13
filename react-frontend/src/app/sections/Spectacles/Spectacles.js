import React, { Component } from "react";
import ListeEvenements from "../../reutilisables/ListeEvenements.js";
import { BounceLoader } from 'react-spinners';
import axios from "axios";

class Spectacles extends Component {
  constructor(props) {
    super(props);
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
    //.catch(error => {
    //  console.log(error)
    //})
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
        <div id="vertical-analytic-banner"></div>
        <ListeEvenements evenements={evenements}/>
      </React.Fragment>
    );
    
  }
}

export default Spectacles;