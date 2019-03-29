import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './DetailsEvenement.css';
import { defaultImage } from '../../assistants/images.js';
import { formatDate } from '../../assistants/dateFormatter.js';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class DetailsEvenement extends Component {

  static defaultProps = {
    center: {
      lat: 45.496075,
      lng: -73.569324
    },
    zoom: 17
  };

  render() {
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
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={45.496075}
            lng={-73.569324}
            text={'Centre Bell'}
          />
        </GoogleMapReact>
      </div>




        </Modal>

     
    );
  } }
  
export default DetailsEvenement;