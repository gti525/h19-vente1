import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './DetailsEvenement.css';
import { defaultImage } from '../../assistants/images.js';
import { formatDate } from '../../assistants/dateFormatter.js';

class DetailsEvenement extends Component {

  render() {
    const { evenementDetailOuvert, fermerDetailEvenement } = this.props;

    return (
      <Modal show={true} onHide={() => fermerDetailEvenement()}>
          <Modal.Header>
            <Modal.Title>Détails de l'événement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img alt="" src={defaultImage} height="90"/>             
              <div className="ligne">
                <div className="col1">
                  Titre:
                </div>
                <div className="col2">
                  {evenementDetailOuvert.title}
                </div>
              </div>
              <div className="ligne">
                <div className="col1">
                  Artiste:
                </div>
                <div className="col2">
                  {evenementDetailOuvert.artist}
                </div>
              </div>
              <div className="ligne">
                <div className="col1">
                  Description:
                </div>
                <div className="col2">
                  {evenementDetailOuvert.description}
                </div>
              </div>
              <div className="ligne">
                <div className="col1">
                  Date:
                </div>
                <div className="col2">
                  {formatDate(evenementDetailOuvert.date)}
                </div>
              </div>
              <div className="ligne">
                <div className="col1">
                  Salle:
                </div>
                <div className="col2">
                  {evenementDetailOuvert.venue.name}
                </div>
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