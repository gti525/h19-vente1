import React, { Component } from "react";

class Evenement extends Component {constructor(props) {
    super(props);
    this.state = {
      idUnique: "id_00",
      jolieImage: "Une jolie image",
      nom: "Un Evenement",
      date: Date("2015-03-25T12:00:00Z"),
      lieu: "QuelquePart, QC",
      type: "Musique",
      enVedette: false
    };
  }
  componentDidMount() {
    this.setState({ idUnique: this.props.idUnique });
    this.setState({ jolieImage: this.props.jolieImage });
    this.setState({ nom: this.props.nom });
    this.setState({ date: this.props.date });
    this.setState({ lieu: this.props.lieu });
    this.setState({ type: this.props.type });
    this.setState({ enVedette: this.props.enVedette });
  }

  render() {
    return (
      <tr>
        <td>{this.state.jolieImage}</td><td>{this.state.nom}</td>
        <td>{this.state.date}</td><td>{this.state.lieu}</td>
      </tr>
    );
  }
}

export default Evenement;