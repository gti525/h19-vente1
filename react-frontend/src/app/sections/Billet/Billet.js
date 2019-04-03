import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { formatDate } from '../../../assistants/dateFormatter.js';
import './Billet.css';

class Billet extends Component {

  render() {
    const { cle } = this.props;
    const { title, artist, date, venue, price } = this.props.event;

    return (
      <tr>
        <td>{title}</td>
        <td>{artist}</td>
        <td>{formatDate(date)}</td>
        <td>{venue.address}</td>
        <td>{price}</td>
        <td>
        <Button
        className="buttonDanger"
        onClick={() => this.props.supprimerBillet(cle)}
        >
        Retirer
        </Button>
        </td>
      </tr>
    );
  }
}

export default Billet;