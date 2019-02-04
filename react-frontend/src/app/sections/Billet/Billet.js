import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Billet extends Component {constructor(props) {
    super(props);
  }

  handleSupprimer = (idBillet, siege) => {
    this.props.onSupprimer(idBillet, siege);
  };

  render() {

    const { idBillet, idEvenement, nom, date, lieu, siege, prixAffiche, type } = this.props;

    return (
      <tr>
        <td>{nom}</td><td>{date}</td><td>{lieu}</td>
        <td>{siege}</td><td>${prixAffiche}</td>
        <td>
        <Button variant="primary" onClick={() => this.handleSupprimer(idBillet, siege)}>X</Button>
        </td>
      </tr>
    );
  }
}

export default Billet;