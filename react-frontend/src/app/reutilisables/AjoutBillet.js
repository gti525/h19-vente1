import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import billets from "../../faussesDonnees/billets.json";

class AjoutBillet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbBillets: 1
    }
  }

  render() {
    const { evenementAchatOuvert, fermerAchatBillet } = this.props;
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
                  {evenementAchatOuvert.title}
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
            <Button onClick={() => this.ajouterAuPanier(evenementAchatOuvert._id, parseFloat(nbBillets))}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }

  changerNbBillets(event) {
    this.setState({ nbBillets: event.target.value })
  }

  ajouterAuPanier(eventId, nbBilletsAjoutees) {
    //Il faut que le nombre de billets à ajouter soit de 1 à 6.
    if(0 < nbBilletsAjoutees && nbBilletsAjoutees < 7) {
      //On obtient le nombre de billets déjà dans le panier
      var billetsPanier = JSON.parse(localStorage.getItem(`panier`));
      if(!billetsPanier) {
        billetsPanier = new Array();
      }
      //On regarde si le nombre de billets total dépasse 6.
      if(billetsPanier.length + nbBilletsAjoutees > 6) {
        alert(`Vous avez déjà ${billetsPanier.length} billets dans le panier, vous pouvez en avoir un maximum de 6.`)
      } else {

        axios.post(`https://sitevente1-serveur.herokuapp.com/events/${eventId}/reserveTickets`, {
          numberOfTickets: nbBilletsAjoutees
        })
        .then(response => {
          if(response.data.error) {
            alert(response.data.error)
          } else {
            var { tickets } = response.data;
            for(let i=0; i<tickets.length; i++) {
              billetsPanier[billetsPanier.length] = tickets[i];
            }
            billetsPanier = JSON.stringify(billetsPanier);
            localStorage.setItem(`panier`, billetsPanier);
            this.props.fermerAchatBillet();
          }
        })
        .catch(error => {
          alert(error.message)
        })

        if(billetsPanier.length > 6) {
          alert("Il y a un probleme avec l'ajout de billets.")
        }
      }
    } else {
      alert("Veuillez entrer un nombre entre 1 et 6.")
    }
  }
}

export default AjoutBillet;