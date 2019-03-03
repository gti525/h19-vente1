import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BilletsDisponibles: null
    }
  }

  componentDidMount() {
    const { billets } = this.props;
    let BilletsDisponibles = [];
    Object.keys(billets).forEach((key) => {
      if(!billets[key].sold) {
        BilletsDisponibles[key] = billets[key];
      }
    });
    this.setState({ BilletsDisponibles: BilletsDisponibles })
  }

  acheterBillets = (index) => {
    if(this.state.BilletsDisponibles) {
      this.props.ouvrirAchatBillet(index);
    }
  };

  afficherDetails = (index) => {
      this.props.ouvrirDetailEvenement(index);
  };

  render() {
    const { BilletsDisponibles } = this.state
    //console.log(BilletsDisponibles)
    const { index, image, nom, date, lieu, type,  } = this.props;
    if(!BilletsDisponibles) {
      return null;
    }
    return (
      <tr>
        <td>
        <Button onClick={() => this.afficherDetails(index)}><img src={image} height="45"/></Button>
        </td>
        {/* <td><img src={image} alt="" height="60"/></td> */}
        <td>{nom}</td>
        <td>{date}</td>
        <td>{lieu}</td>
        <td>{type}</td>
        <td>
          <Button
          variant="primary"
          disabled={!BilletsDisponibles.length}
          title={BilletsDisponibles ? "" : "Sold Out"}
          onClick={() => this.acheterBillets(index)}>
            {BilletsDisponibles.length ? "Ajouter au panier" : "Non disponible"}
          </Button>
        </td>
      </tr>
    );
  }
}

export default Evenement;