import React, { Component } from "react";
import Evenement from "../sections/Evenement/Evenement.js";

class ListeEvenements extends Component {

  render() {
    const { evenements } = this.props;
    return (
      <div>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Nom</th>
                <th scope="col">Date</th>
                <th scope="col">Lieu</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {this.renderEvenements(evenements)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderEvenements = (evenements) => {
    return (
      Object.keys(evenements).map((key) => (
        <Evenement {...evenements[key]} key={key}/>
      ))
    );
  }
}

export default ListeEvenements;