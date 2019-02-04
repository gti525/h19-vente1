import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Billet extends Component {constructor(props) {
    super(props);
    this.state = {
      idBillet: "idb_00",
      idEvenement: "ide_00",
      nom: "Un Billet",
      date: Date("2015-03-25T12:00:00Z"),
      lieu: "QuelquePart, QC",
      siege: "0000",
      prixAffiche: 99.99,
      type: "Musique"
    };
  }
  componentDidMount() {
    this.setState({ idBillet: this.props.idBillet });
    this.setState({ idEvenement: this.props.idEvenement });
    this.setState({ nom: this.props.nom });
    this.setState({ date: this.props.date });
    this.setState({ lieu: this.props.lieu });
    this.setState({ siege: this.props.siege });
    this.setState({ prixAffiche: this.props.prixAffiche });
    this.setState({ type: this.props.type });
  }

  handleSupprimer = (idBillet, siege) => {
    this.props.onSupprimer(idBillet, siege);
  };

  render() {

    const id = this.props.idBillet;
    const siege = this.props.siege;

    return (
      <tr>
        <td>{this.state.nom}</td><td>{this.state.date}</td><td>{this.state.lieu}</td>
        <td>{this.state.siege}</td><td>${this.state.prixAffiche}</td>
        <td>
        <Button variant="primary"  onClick={() => this.handleSupprimer(id, siege)}>X</Button>
        </td>
      </tr>
    );
  }
}

export default Billet;