import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class AjoutBillet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreBillets: 1
    }
  }

  render() {
    const { evenementOuvert, fermerAchatBillet } = this.props;
    const { nombreBillets } = this.state;

    return (
      <Modal show={true} onHide={() => fermerAchatBillet()}>
          <Modal.Header>
            <Modal.Title>Acheter Billet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className="form-horizontal" name="billetForm">
            <div className="form-group">
                <label className="col-md-4 control-label">
                  Titre du spectacle
                </label>
                <div className="col-md-4">
                  {evenementOuvert.nom}
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-4 control-label">
                  Nombre de billets
                </label>
                <div className="col-md-4">
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    max="6"
                    value={nombreBillets}
                    onChange={this.changerNombreBillets.bind(this)}
                    className="form-control"
                  />
                </div>
              </div>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => fermerAchatBillet()}>
              Fermer
            </Button>
            <Button onClick={() => this.ajouterAuPanier(nombreBillets)}>Ajouter au panier</Button>
          </Modal.Footer>
        </Modal>
    );
  }

  changerNombreBillets(event) {
    this.setState({ nombreBillets: event.target.value })
  }

  ajouterAuPanier(nombreBillets) {
    {/*
      Mettre la logique d'ajout de billets au panier.
      S'assurer qu'il y a assez de billets disponibles dans le backend.
      Enlever les billets sélectionnés de la circulation.
      Ajouter les billets au panier (localStorage).
   */}
    console.log("Billet(s) ajouté(s) au panier")
    console.log(nombreBillets)
    this.props.fermerAchatBillet();
  }
}

export default AjoutBillet;