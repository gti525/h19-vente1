import React, { Component } from "react";
import ReactTimeout from "react-timeout";
import { Modal, Button } from "react-bootstrap";
import Billet from "../Billet/Billet.js";
//import billets from "../../../faussesDonnees/billets.json";
import Form from "../Form/Form.js";
import "./Panier.css";

class Panier extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      commanderModal: false,
      monPanier: null,
      monTotal: 0.00,
      estConnecteAuRS: false,
      confirmationAchat:  ""
    };
  }

  componentDidMount() {

    const monPanier = JSON.parse(localStorage.getItem('panier'));
    this.setState({ monPanier: monPanier });
  }

  delaiFormulaire = () => {
    this.setState({ evenementModal: false })
    this.setState({ confirmationAchat: "Délai de 10 minutes dépassé." })
  }

  handlePasserCommande = () => {
    
    this.setState({ evenementModal: true })
    this.props.setTimeout(this.delaiFormulaire, 10*60*1000)
  };

  handleCommander = () => {
    //Commander les billets présents dans le panier

    const estConnecteAuRS = sessionStorage.getItem(`social`);

    if (estConnecteAuRS) {
      this.setState({ confirmationAchat: "Les billets seront disponibles sur le site et sur l'application mobile." });  
    }
    else {
      this.setState({ confirmationAchat: "Les billets seront récupérables le soir de l'événement." });  
    }

    this.setState({ evenementModal: false })

  };
  
  //TODO! Il faut retirer le siège réservé de son événement
  supprimerBillet = (billetKey) => {
    const panier = this.state.monPanier;
    panier.splice(billetKey, 1);
    this.setState({ monPanier: panier });
    localStorage.setItem(`panier`, JSON.stringify(this.state.monPanier));
  };

  render() {
    var { monPanier } = this.state;
    if(!monPanier){
      return null;
    }
    return (
      <div>
        <div className="container">
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
                "Coût total (après taxes) :" + this.state.monTotal.toString() + "$"
            }</tfoot>
          </table>
          <Button variant="primary" onClick={this.handlePasserCommande}>Passer la commande</Button>
          <div> 
            <br /> {this.state.confirmationAchat}
          </div>
          <Modal  dialogClassName="Panier-modal" show={this.state.evenementModal}>
          <Modal.Header>
            <Modal.Title>Passer la commande</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ evenementModal: false })}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
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
}

export default ReactTimeout(Panier);
