import React, { Component } from "react";
import Billet from "../Billet/Billet.js";

class Visionner extends Component {
  constructor(props) {
    super(props);
    this.state = { billets: [] };

    this.state.billets[0] = { idUnique: "spo000", jolieImage: "image.bmp", nom: "Événement sportif",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", siege: "A-12", prixAffiche: 99.99, type: "sport", enVedette: false };
    this.state.billets[1] = { idUnique: "spo001", jolieImage: "image.bmp", nom: "Événement sportif",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", siege: "A-13", prixAffiche: 99.99, type: "sport", enVedette: true };
    this.state.billets[2] = { idUnique: "spo002", jolieImage: "image.bmp", nom: "Événement sportif",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", siege: "A-14", prixAffiche: 99.99, type: "sport", enVedette: false };
  }

  render() {
    var { billets } = this.state;
    var renderBillets = () => {
      if (billets.length === 0) {
        return null;
      }
      return billets.map(billet => <Billet {...billet} key={billet.idUnique}/>);
    };
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
            <tbody>{renderBillets()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Visionner;