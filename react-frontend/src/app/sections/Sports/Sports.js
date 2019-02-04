import React, { Component } from "react";
import Evenement from "../Evenement/Evenement.js";

class Sports extends Component {
  constructor(props) {
    super(props);
    this.state = { eventList: [] };

    this.state.eventList[0] = {idUnique: "spo000", jolieImage: "image.bmp", nom: "Événement sportif 00",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", type: "sport", 
    enVedette: false, evenementModal: false, siegesDispo:  [true,true,true,true]};

    this.state.eventList[1] = {idUnique: "spo001", jolieImage: "image.bmp", nom: "Événement sportif 01",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", type: "sport", 
    enVedette: true, evenementModal: false, siegesDispo:  [true,true,true,true]};

    this.state.eventList[2] = {idUnique: "spo002", jolieImage: "image.bmp", nom: "Événement sportif 02",
    date: Date("2015-03-25T12:00:00Z"), lieu: "QuelquePart, QC", type: "sport", 
    enVedette: false, evenementModal: false, siegesDispo:  [true,true,true,true]};
  }

  render() {
    var { eventList } = this.state;
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
              </tr>
            </thead>
            <tbody>
            {Object.keys(eventList).map((eventKey) => (
                <Evenement {...eventList[eventKey]} key={eventKey}/>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Sports;