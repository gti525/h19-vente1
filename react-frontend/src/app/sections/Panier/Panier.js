import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Billet from "../Billet/Billet.js";
import Form from "../Form/Form.js";
import "./Panier.css";

class Panier extends Component {
  constructor(props) {
    super(props);
    this.closeForm = this.closeForm.bind(this);
    this.endForm = this.endForm.bind(this);

    this.state = { 
      commanderModal: false,
      monPanier: null,
      monTotal: 0.00,
      estConnecteAuRS: false,
      confirmationAchat:  ""
    };
  }

  componentDidMount() {
    var monPanier = JSON.parse(sessionStorage.getItem('panier'));
    if(monPanier === null) {
      monPanier = [];
    }
    this.setState({ monPanier });
  }

  calculerTotal = () => {
    var total = 0;
    for (var i = 0; i < this.state.monPanier.length; i++) {
      total += this.state.monPanier[i].event.price;
    }
    return total * (1 + 0.05 + 0.09975) ;
  }

  handlePasserCommande = () => {
    this.setState({ evenementModal: true })
  };
  
  supprimerBillet = (billetKey) => {
    const panier = this.state.monPanier;
    panier.splice(billetKey, 1);
    this.setState({ monPanier: panier });
    sessionStorage.setItem(`panier`, JSON.stringify(this.state.monPanier));
  };

  render() {
    var { monPanier } = this.state;
    if(!monPanier){
      return null;
    }
    return (
      <div>
        <div className="container">
          <div className="ticketTable">
            <br />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Artiste</th>
                  <th scope="col">Date</th>
                  <th scope="col">Lieu</th>
                  <th scope="col">Prix</th>
                  <th />
                </tr>
              </thead>
              <tbody>{             
                  this.renderBillets(monPanier)
              }</tbody>
              <tfoot>{
                  "Coût total (après taxes) : " + this.calculerTotal().toFixed(2).toString() + "$"
              }</tfoot>
            </table>
            <Button
              className="buttonPrimary"
              disabled={monPanier.length === 0}
              onClick={this.handlePasserCommande}
            >
              Passer la commande
            </Button>
            <div>
              <br/>
              {this.state.confirmationAchat}
            </div>
            <Modal dialogClassName="Panier-modal" show={this.state.evenementModal}>
            <Modal.Header>
              <Modal.Title>Passer la commande</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form monPanier={monPanier} amount={this.calculerTotal().toFixed(2)} endForm={this.endForm}/>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="buttonDanger"
                onClick={() => this.closeForm()}
              >
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
          <div id="vertical-analytic-banner"/>
        </div>
      </div>
    );
  }

  renderBillets = (panier) => {
    if(panier) {
      return (
        Object.keys(panier).map(panierKey => (
          <Billet
          key={panierKey}
          cle={panierKey}
          {...panier[panierKey]}
          supprimerBillet={this.supprimerBillet}
          />
        ))
      );
    }
  }

  closeForm() {
    this.setState({ evenementModal: false });
  }

  endForm() {
    this.setState({
      evenementModal: false,
      monPanier: []
    });
  }
}

export default Panier;
