import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Billet extends Component {

  render() {
    const { cle, nom, date, lieu, siege, prixAffiche } = this.props;

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
        <div id="vertical-analytic-banner"></div>
      </tr>
    );
  }
}

export default Billet;