import React, { Component } from "react";
import Evenement from "../Evenement/Evenement.js";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { evenements: [] };

    this.state.evenements[0] = {idUnique: "mus001", jolieImage: "image.bmp", nom: "Événement musical 01",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", type: "musique", 
    enVedette: true, evenementModal: false, siegesDispo:  [true,true,true,true]};

    this.state.evenements[1] = {idUnique: "spo001", jolieImage: "image.bmp", nom: "Événement sportif 01",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", type: "sport", 
    enVedette: true, evenementModal: false, siegesDispo: [true,true,true,true]};
  }

  render() {
    var { evenements } = this.state;
    var renderEvenements = () => {
      if (evenements.length === 0) {
        return null;
      }
      return evenements.map(evenement => <Evenement {...evenement} key={evenement.idUnique}/>);
    };
    return (
      <div>
        <div className="container">
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Nom</th>
                <th scope="col">Date</th>
                <th scope="col">Lieu</th>
              </tr>
            </thead>
            <tbody>{renderEvenements()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default HomePage;
