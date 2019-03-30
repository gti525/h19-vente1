import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { defaultImage } from '../../../assistants/images.js';
import { formatDate } from '../../../assistants/dateFormatter.js';
import "./Evenement.css";

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  acheterBillets = (index) => {
    this.props.ouvrirAchatBillet(index);
  };

  afficherDetails = (index) => {
      this.props.ouvrirDetailEvenement(index);
  };

  checkIfSoldOut() {
    return this.props.status === "sold out";
  }

  render() {
    const { index, title, date, venue, price, imageUrl } = this.props;
    return (
      <tr>
        <td>
        <Button onClick={() => this.afficherDetails(index)}><img alt="" src={ imageUrl || defaultImage } height="45"/></Button>
        </td>
        <td>{title}</td>
        <td>{formatDate(date)}</td>
        <td>{venue.address}</td>
        <td>{price}$</td>
        <td>
          <Button
          className={ this.checkIfSoldOut() ? "" : "buttonOnSale"}
          title=""
          disabled={this.checkIfSoldOut()}
          onClick={() => this.acheterBillets(index)}>
            { this.checkIfSoldOut() ? "Guichet fermé" : "Ajouter au panier" }
          </Button>
        </td>
      </tr>
    );
  }
}

export default Evenement;