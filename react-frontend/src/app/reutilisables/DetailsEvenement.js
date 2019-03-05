import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DetailsEvenement extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { evenementDetailOuvert, fermerDetailEvenement } = this.props;

    return (
      <Modal show={true} onHide={() => fermerDetailEvenement()}>
          <Modal.Header>
            <Modal.Title>Détails de l'événement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
                <img src={evenementDetailOuvert.image} height="90"/>             
            <div className="container">
            </div>
            <div>
            {evenementDetailOuvert.nom}
            </div>
            <div lineheight="30">
               {evenementDetailOuvert.date}
            </div>
            <div>
            {evenementDetailOuvert.lieu}
            </div>
            <div>
            Infos supplémentaires à ajouter
            </div> 
            </div>         
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => fermerDetailEvenement()}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default DetailsEvenement;