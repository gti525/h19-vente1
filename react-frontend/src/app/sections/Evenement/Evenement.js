import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { defaultImage } from '../../../assistants/images.js';
import { formatDate } from '../../../assistants/dateFormatter.js';

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  acheterBillets = (index) => {
    this.props.ouvrirAchatBillet(index);
  };

  afficherDetails = (index) => {
      this.props.ouvrirDetailEvenement(index);
  };

  render() {
    const { index, title, date, venue  } = this.props;
    return (
      <tr>
        <td>
        <Button onClick={() => this.afficherDetails(index)}><img alt="" src={defaultImage} height="45"/></Button>
        </td>
        <td>{title}</td>
        <td>{formatDate(date)}</td>
        <td>{venue.address}</td>
        <td>
          <Button
          variant="primary"
          title=""
          onClick={() => this.acheterBillets(index)}>
            Ajouter au panier
          </Button>
        </td>
      </tr>
    );
  }
}

export default Evenement;