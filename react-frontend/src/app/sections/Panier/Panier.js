import { Modal, Button } from "react-bootstrap";

import React, { Component } from "react";
import Billet from "../Billet/Billet.js";

class Panier extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      billets: [] ,
      commanderModal: false
    
    };

    this.state.billets[0] = { idBillet: "bs00", idEvenement: "spo000", jolieImage: "image.bmp", nom: "Événement sportif 00",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", siege: "001", prixAffiche: 99.99, type: "sport", enVedette: false };

    this.state.billets[1] = { idBillet: "bs01", idEvenement: "spo001", jolieImage: "image.bmp", nom: "Événement sportif 01",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", siege: "002", prixAffiche: 99.99, type: "sport", enVedette: true };

    this.state.billets[2] = { idBillet: "bs02", idEvenement: "spo002", jolieImage: "image.bmp", nom: "Événement sportif 02",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", siege: "003", prixAffiche: 99.99, type: "sport", enVedette: false };
  }

  handleCommander = () => {
    //Commander les billets présents dans le panier
  };
  
  //TODO! Il faut retirer le siège réservé de son événement
  handleSupprimer = (idBillet, siege) => {
    
    var billets = this.state.billets;

    var newBillets = billets.filter(function(billet) {
      return billet.idBillet !== idBillet;
    });

    this.setState({ billets: newBillets });
  } ;

  render() {
    var { billets } = this.state;
    var renderBillets = () => {
      if (billets.length === 0) {
        return null;
      }
      return billets.map(billet => <Billet {...billet} onSupprimer={this.handleSupprimer} key={billet.idBillet}/>);
    };
    return (
      <div>
        <div className="container">
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Date</th>
                <th scope="col">Lieu</th>
                <th scope="col">Siège</th>
                <th scope="col">Prix</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderBillets()}</tbody>
          </table>
          <Button variant="primary" onClick={() => this.setState({ evenementModal: true })}>Commander</Button>
          <Modal show={this.state.evenementModal}>
          <Modal.Header>
            <Modal.Title>Passer la commande</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className="form-horizontal" name="billetForm">
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ evenementModal: false })}>
              Fermer
            </Button>
            <Button onClick={this.handleCommander}>Commander</Button>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
    );
  }
}

export default Panier;