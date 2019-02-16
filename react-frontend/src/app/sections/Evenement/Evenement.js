import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreBilletsDisponibles: null
    }
  }

  componentDidMount() {
    let billetsCount = 0;
    Object.keys(this.props.billets).forEach((key) => {
      if(!this.props.billets[key].sold) {
        billetsCount++;
      }
    })
    this.setState({ nombreBilletsDisponibles: billetsCount })
  }

  acheterBillets = (index) => {
    if(this.state.nombreBilletsDisponibles) {
      this.props.ouvrirAchatBillet(index);
    }
  };

  render() {
    const { nombreBilletsDisponibles } = this.state
    console.log(nombreBilletsDisponibles)
    const { index, image, nom, date, lieu, type,  } = this.props;
    return (
      <tr>
        <td><img src={image} alt="" height="60"/></td>
        <td>{nom}</td>
        <td>{date}</td>
        <td>{lieu}</td>
        <td>{type}</td>
        <td>
          <Button variant="primary" disabled={!nombreBilletsDisponibles} title={nombreBilletsDisponibles ? "" : "Sold Out"} onClick={() => this.acheterBillets(index)}>Ajouter au panier</Button>
        </td>
      </tr>
    );
  }
}

export default Evenement;