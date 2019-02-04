import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Evenement extends Component {constructor(props) {
    super(props);
    this.state = {
      idUnique: "id_00",
      jolieImage: "Une jolie image",
      nom: "Un Evenement",
      date: Date("2015-03-25T12:00:00Z"),
      lieu: "QuelquePart, QC",
      type: "Musique",
      enVedette: false,
      evenementModal: false,
      siegesDispo: []
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
    this.setState({ evenementModal: this.props.evenementModal });
    this.setState({ siegesDispo: this.props.siegesDispo });
  }

  handleSieges = e => {

    //Vérifier disponibilité avec siegesDispo
  };

  handleAcheter = () => {
    
    //Ajouter le billet au panier
  };

  render() {
    return (
      <tr>
        <td>{this.state.jolieImage}</td><td>{this.state.nom}</td>
        <td>{this.state.date}</td><td>{this.state.lieu}</td>
        <td>
        <Button variant="primary" onClick={() => this.setState({ evenementModal: true })}>Acheter</Button>
        </td>
        <Modal show={this.state.evenementModal}>
          <Modal.Header>
            <Modal.Title>Acheter Billet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className="form-horizontal" name="billetForm">
            <div className="form-group">
                <label className="col-md-4 control-label">
                  Siège
                </label>
                <div className="col-md-4">
                  <input
                    name="siege"
                    placeholder="00000"
                    onChange={this.handleSiege}
                    className="form-control"
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-4 control-label">
                  Prix
                </label>
                <div className="col-md-4">
                  <input
                    name="prix"
                    placeholder="00.00$"
                    className="form-control"
                  />
                </div>
              </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ evenementModal: false })}>
              Fermer
            </Button>
            <Button onClick={this.handleAcheter}>Acheter</Button>
          </Modal.Footer>
        </Modal>
      </tr>
    );
  }
}

export default Evenement;