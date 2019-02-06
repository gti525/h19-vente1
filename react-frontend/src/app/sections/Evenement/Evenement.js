import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Evenement extends Component {constructor(props) {
    super(props);
  }

  handleSieges = e => {

    //Vérifier disponibilité avec siegesDispo
  };

  handleAcheter = () => {
    
    //Ajouter le billet au panier
  };

  render() {
    const { idUnique, image, nom, date, lieu, type, enVedette, evenementModal, siegesDispo } = this.props;
    return (
      <tr>
        <td>{image}</td>
        <td>{nom}</td>
        <td>{date}</td>
        <td>{lieu}</td>
        <td>{type}</td>
        <td>
          <Button variant="primary" onClick={() => this.setState({ evenementModal: true })}>Acheter</Button>
        </td>
        <Modal show={evenementModal}>
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