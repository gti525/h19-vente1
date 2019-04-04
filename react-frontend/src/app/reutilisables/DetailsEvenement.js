import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './DetailsEvenement.css';
import { defaultImage } from '../../assistants/images.js';
import { formatDate } from '../../assistants/dateFormatter.js';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";

class DetailsEvenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      center: {
        lat: null,
        lng: null
      },
      zoom: 18
    };
  }

  componentDidMount() {
    Geocode.setApiKey("AIzaSyAwK5vgraM6clfN2sin8xyiW7En52KZb0w");
    Geocode.fromAddress(this.props.evenementDetailOuvert.venue.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        this.setState({
          center: {
            lat,
            lng
          }
        })
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    console.log(this.props)
    const { evenementDetailOuvert, fermerDetailEvenement } = this.props;

    return (
      <Modal show={true} onHide={() => fermerDetailEvenement()}>
          <Modal.Header>
            <Modal.Title>Détails de l'événement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img alt="" src={ evenementDetailOuvert.imageUrl || defaultImage } height="90"/>             
              <div className="ligne">
                <div className="col1">
                  Titre:
                </div>
                <div className="col2">
                  {evenementDetailOuvert.title}
                </div>
              </div>
              <div className="ligne">
                <div className="col1">
                  Artiste:
                </div>
                <div className="col2">
                  {evenementDetailOuvert.artist}
                </div>
              </div>
              <div className="ligne">
                <div className="col1">
                  Description:
                </div>
                <div className="col2">
                  {evenementDetailOuvert.description}
                </div>
              </div>
              <div className="ligne">
                <div className="col1">
                  Date:
                </div>
                <div className="col2">
                  {formatDate(evenementDetailOuvert.date)}
                </div>
              </div>
              <div className="ligne">
                <div className="col1">
                  Salle:
                </div>
                <div className="col2">
                  {evenementDetailOuvert.venue.name}
                </div>
              </div>
            </div>         
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => fermerDetailEvenement()}>
              Fermer
            </Button>
          </Modal.Footer>

          <div style={{ height: '100vh', width: '100%' }}>
          
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAwK5vgraM6clfN2sin8xyiW7En52KZb0w' }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
            >
              <AnyReactComponent
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                text={evenementDetailOuvert.venue.name}
              />
            </GoogleMapReact>
          </div>
        </Modal>
    );
  }
}

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default DetailsEvenement;