//import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import './DetailsEvenement.css';
import { defaultImage } from '../../assistants/images.js';
import { formatDate } from '../../assistants/dateFormatter.js';
import GoogleMapReact from 'google-map-react';
import { GoogleMap, withGoogleMap } from 'react-google-maps';
import { default as React, Component } from 'react';
import { Marker} from 'react-google-maps';
import Geocode from "react-geocode";

const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyAwK5vgraM6clfN2sin8xyiW7En52KZb0w'}`;

const SimpleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    googleMapUrl={googleMapUrl}
    zoom={props.zoom}
    center={props.center}
    >
    {props.markers.map((marker, index) =>
      <Marker
        position={marker.position}
    ></Marker>)};
  </GoogleMap>));

const geo = Geocode.setApiKey("AIzaSyAwK5vgraM6clfN2sin8xyiW7En52KZb0w");
const groupMarkers = [];
  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyAwK5vgraM6clfN2sin8xyiW7En52KZb0w");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

// Get address from latidude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  response => {
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  error => {
    console.error(error);
  }
);

// Get latidude & longitude from address.
Geocode.fromAddress("Eiffel Tower").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  error => {
    console.error(error);
  }
);

export class DetailsEvenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 11,
      center: { lat: 29.969516, lng: -90.103866 },
      markers: [],
      markersLoaded: false,
    };
  }

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



          <SimpleGoogleMap containerElement={
            <div className="mapContainer" />
            }
            mapElement={
              <div className="map" />
            }
            />



        </Modal>

     
    );
  } }
  //for each group location
  //eslint-disable-next-line
geo.find(location, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    const position = res[0].location;
    groupMarkers.push(position);
}});
this.setState({
  markersLoaded: true,
});

export default DetailsEvenement;