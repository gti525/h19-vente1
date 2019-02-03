import React, { Component } from "react";

class Billet extends Component {constructor(props) {
    super(props);
    this.state = {
      idUnique: "id_00",
      nom: "Un Billet",
      date: Date("2015-03-25T12:00:00Z"),
      lieu: "QuelquePart, QC",
      siege: "A-11",
      prixAffiche: 99.99,
      type: "Musique"
    };
  }
  componentDidMount() {
    this.setState({ idUnique: this.props.idUnique });
    this.setState({ nom: this.props.nom });
    this.setState({ date: this.props.date });
    this.setState({ lieu: this.props.lieu });
    this.setState({ siege: this.props.siege });
    this.setState({ prixAffiche: this.props.prixAffiche });
    this.setState({ type: this.props.type });
  }

  render() {
    return (
      <tr>
        <td>{this.state.nom}</td><td>{this.state.date}</td><td>{this.state.lieu}</td>
        <td>{this.state.siege}</td><td>${this.state.prixAffiche}</td>
      </tr>
    );
  }
}

export default Billet;