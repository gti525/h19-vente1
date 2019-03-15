import React, { Component } from "react";
import { Form, FormGroup, Label, Input,Row, Col, Button } from 'reactstrap';
import InputMask from 'react-input-mask';
import { Modal } from 'react-bootstrap';
import axios from "axios";
import "./Form.css";


class Formulaire extends Component {
  constructor(props) {
    super(props);
    this.ouvrirConnexion = this.ouvrirConnexion.bind(this);
    this.fermerConnexion = this.fermerConnexion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitSocialForm = this.submitSocialForm.bind(this);
    this.deconnexion = this.deconnexion.bind(this);
    this.state = {
      nom: "",
      prenom: "",
      adresse: "",
      ville: "",
      province: "",
      codePostal: "",
      ccNom: "",
      ccPrenom: "",
      ccNoCarte: "",
      ccMoExp: "",
      ccAnExp: "",
      ccCvv: "",
      socialEmail: "",
      socialPassword: "",
      connexionModal: false
    };
  }

  render() {
    const estConnecte = sessionStorage.getItem(`social`);
    return (
      <React.Fragment>
        <Form className="designForm" onSubmit={this.submitForm}>
          <h2 className="titreDeSection">Informations Personnelles</h2>
          {estConnecte ?
            <Button onClick={this.deconnexion}>Se déconnecter</Button> :
            <React.Fragment>
              <Button onClick={this.ouvrirConnexion}>Se connecter avec le réseau social</Button>
              <Row form1>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Nom</Label>
                    <Input type="text" name="nom" id="lastname" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Prénom</Label>
                    <Input type="text" name="prenom" id="firstname" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form1>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Adresse</Label>
                    <Input type="text" name="adresse" id="address" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Ville</Label>
                    <Input type="text" name="ville" id="city" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form1>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Province</Label>
                    <Input type="text" name="province" id="province" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Code Postal</Label>
                    <Input type="text" name="codePostal" id="postalCode" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
              </Row>
            </React.Fragment>
          }
          <h2 className="titreDeSection">Carte de crédit</h2>
          <Row form1>
            <Col md={5}>
              <FormGroup>
                <Label for="nom">Nom</Label>
                <Input type="text" name="ccNom" id="cclastname" onChange={this.onChange}/>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="nom">Prénom</Label>
                <Input type="text" name="ccPrenom" id="ccfirstname" onChange={this.onChange}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form2>
            <Col md={6}>
              <FormGroup>
                <Label for="cardNumber">Numéro de la carte </Label>
                <InputMask name="ccNoCarte" mask="9999 9999 9999 9999" maskChar=" " onChange={this.onChange}/>
              </FormGroup>
            </Col>
          </Row>
          <Row form3>
            <Col md={2}>
              <FormGroup>
                  <Label for="month">Mois d'expiration</Label>
                      <Input type="select" name="ccMoExp" id="ccmonth" onChange={this.onChange}>
                          <option>Janvier</option>
                          <option>Février</option>
                          <option>Mars</option>
                          <option>Avril</option>
                          <option>Mai</option>
                          <option>Juin</option>
                          <option>Juillet</option>
                          <option>Aout</option>
                          <option>Septembre</option>
                          <option>Octobre</option>
                          <option>Novembre</option>
                          <option>Decembre</option>
                      </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="years">Année d'expiration</Label>
                <InputMask  name="ccAnExp" mask="9999" maskChar=" " onChange={this.onChange}/>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
              <Label for="cvv">cvv</Label>
                <InputMask name="ccCvv" mask="999" maskChar=" " onChange={this.onChange}/>
              </FormGroup>  
            </Col>
          </Row>
          <Button>Envoyer</Button>
        </Form>
        <Modal show={this.state.connexionModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Connexion au réseau social</Modal.Title>
          </Modal.Header>
          <Form className="designForm" onSubmit={this.submitSocialForm}>
            <Modal.Body>
            <Row form1>
              <Col md={5}>
                <FormGroup>
                  <Label for="nom">Adresse Courriel</Label>
                  <Input type="text" name="socialEmail" id="socialEmail" onChange={this.onChange}/>
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="nom">Mot de passe</Label>
                  <Input type="password" name="socialPassword" id="socialPassword" onChange={this.onChange}/>
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.fermerConnexion}>
              Fermer
            </Button>
            <Button color="primary" variant="primary">
              Se connecter
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }

  onChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    })
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.state)
  }

  submitSocialForm(e) {
    e.preventDefault();
    axios.post("https://sitevente1-serveur.herokuapp.com/social/login", {
      email: this.state.socialEmail,
      password: this.state.socialPassword
    })
    .then(response => {
      var { data } = response.data;
      sessionStorage.setItem(`social`, data.Token)
      this.setState({
        nom: data.LastName,
        prenom: data.FirstName,
        adresse: data.Address,
        ville: data.City,
        province: data.Province,
        codePostal: data.PostalCode,
        connexionModal: false
      })
      console.log(response)
    })
    //.catch(error => {
    //  console.log(error)
    //})
  }

  ouvrirConnexion() {
    this.setState({ connexionModal: true })
  }

  fermerConnexion() {
    this.setState({ connexionModal: false })
  }

  deconnexion() {
    sessionStorage.removeItem(`social`);
    this.setState({
      nom: "",
      prenom: "",
      adresse: "",
      ville: "",
      province: "",
      codePostal: ""
    })
  }
}
export default Formulaire;
