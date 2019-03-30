import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { formatDate } from '../../../assistants/dateFormatter.js';

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
        <Button variant="primary" onClick={() => this.props.supprimerBillet(cle)}>X</Button>
        </td>
      </tr>
    );
  }
}

export default Billet;