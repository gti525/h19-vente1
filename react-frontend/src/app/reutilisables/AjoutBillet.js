import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import billets from "../../faussesDonnees/billets.json";

class AjoutBillet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbBillets: 1
    }
  }

  render() {
    const { evenementOuvert, fermerAchatBillet } = this.props;
    const { nbBillets } = this.state;

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
                    value={nbBillets}
                    onChange={this.changerNbBillets.bind(this)}
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
            <Button onClick={() => this.ajouterAuPanier(evenementOuvert.id, parseFloat(nbBillets))}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }

  changerNbBillets(event) {
    this.setState({ nbBillets: event.target.value })
  }

  ajouterAuPanier(id, nbBilletsAjoutees) {
    //Il faut que le nombre de billets à ajouter soit de 1 à 6.
    if(0 < nbBilletsAjoutees && nbBilletsAjoutees < 7) {
      //On obtient le nombre de billets déjà dans le panier
      var billetsPanier = JSON.parse(localStorage.getItem(`panier`));
      if(!billetsPanier) {
        billetsPanier = [];
      }
      //On regarde si le nombre de billets total dépasse 6.
      if(billetsPanier.length + nbBilletsAjoutees > 6) {
        alert(`Vous avez déjà ${billetsPanier.length} billets dans le panier, vous pouvez en avoir un maximum de 6.`)
      } else {

        let fauxBillets = [];

        if (id == "spo001")
        {
          fauxBillets = [billets[0], billets[1]]; //Fonction qui get les billets dans le backend selon le nombre de nbBilletsAjoutees
        }

        if (id == "spo003")
        {
          fauxBillets = [billets[2], billets[3]]; //Fonction qui get les billets dans le backend selon le nombre de nbBilletsAjoutees
        }

        for(let i=0; i<fauxBillets.length; i++) {
          billetsPanier[billetsPanier.length] = fauxBillets[i];
        }

        if(billetsPanier.length > 6) {
          alert("Il y a un probleme avec l'ajout de billets.")
        }

        //On ajoute le nouveau nombre de billets dans le panier (localStorage)
        billetsPanier = JSON.stringify(billetsPanier);
        localStorage.setItem(`panier`, billetsPanier);
        this.props.fermerAchatBillet();
      }
    } else {
      alert("Veuillez entrer un nombre entre 1 et 6.")
    }
  }
}

/*
Fonctionnalité qui sera utile pour obtenir les billets dans le panier.
À utiliser dans la classe Panier.js
let search = 'panier';
let values = Object.keys(localStorage)
               .filter( (key)=> key.startsWith(search) )
               .forEach( (key)=> console.log(key) );
*/
export default AjoutBillet;