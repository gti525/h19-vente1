import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { formatDate } from '../../../assistants/dateFormatter.js';

class Billet extends Component {

  render() {
    //console.log(this.props);
    const { cle/*, nom, date, lieu, siege, prixAffiche */} = this.props;

    return (
      <tr>
        <td>{this.props.event.title}</td>
        <td>{this.props.event.artist}</td>
        <td>{formatDate(this.props.event.date)}</td>
        <td>A ajouter</td>
        <td>A ajouter $</td>
        <td>
        <Button variant="primary" onClick={() => this.props.supprimerBillet(cle)}>X</Button>
        </td>
        <div id="vertical-analytic-banner"></div>
      </tr>
    );
  }
}

export default Billet;