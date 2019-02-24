import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Billet from "../Billet/Billet.js";
import billets from "../../../faussesDonnees/billets.json";

// function allStorage() {
  
//   var values = [],
//       keys = Object.keys(localStorage),
//       i = keys.length;

//   while ( i-- ) {
//       values.push(JSON.parse(localStorage.getItem(keys[i])));
//   }

//   return values;
// }

class Panier extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      //billets: null,
      commanderModal: false,
     // panier: null,
      monPanier: null
    };
  }

  componentDidMount() {

    // const panier = [];
    // Object.keys(billets).map(billetKey => (
    //   panier[billets[billetKey].idBillet] = 1
    // ))
    // this.setState({ panier: panier });
    // console.log(panier);

    const monPanier = JSON.parse(localStorage.getItem('panier'));
    this.setState({ monPanier: monPanier });
    console.log(monPanier);
    //console.log(this.state.monPanier);
    //var mesBillets = [];
    //this.setState({ monPanier: allStorage() });
    //console.log(allStorage());
    //var billetsPanier = JSON.parse(localStorage.getItem(`panier${id}`));
    // Object.keys(monPanier).map(panKey => (
    //   Object.keys(monPanier[panKey]).map(panEvKey => (
    //     mesBillets[mesBillets.length] = monPanier[panKey][panEvKey]
    //     ))
    // ))
    // console.log(mesBillets);
    // this.setState({ mesBillets: mesBillets });
  }

  handleCommander = () => {
    //Commander les billets présents dans le panier
  };
  
  //TODO! Il faut retirer le siège réservé de son événement
  supprimerBillet = (billetKey) => {
    const panier = this.state.monPanier;
    panier.splice(billetKey, 1);
    //delete panier[billetKey];
    this.setState({ monPanier: panier });
    localStorage.setItem(`panier`, JSON.stringify(this.state.monPanier));
    //console.log(panier);
  };

  render() {
    var { monPanier } = this.state;
    //var { panier } = this.state;
    console.log(monPanier);
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
                <th scope="col">Date</th>
                <th scope="col">Lieu</th>
                <th scope="col">Siège</th>
                <th scope="col">Prix</th>
                <th />
              </tr>
            </thead>
            <tbody>{             
                this.renderBillets(monPanier)
             
              }</tbody>
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

export default Panier;