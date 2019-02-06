import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Billet extends Component {

  render() {

    const { cle, idBillet, idEvenement, nom, date, lieu, siege, prixAffiche, type } = this.props;

    return (
      <tr>
        <td>{nom}</td>
        <td>{date}</td>
        <td>{lieu}</td>
        <td>{siege}</td>
        <td>${prixAffiche}</td>
        <td>
        <Button variant="primary" onClick={() => this.props.supprimerBillet(cle)}>X</Button>
        </td>
      </tr>
    );
  }
}

export default Billet;