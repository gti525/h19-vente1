import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import InputMask from 'react-input-mask';
import { Modal } from 'react-bootstrap';
import axios from "axios";
import "./Form.css";


class Formulaire extends Component {
  constructor(props) {
    super(props);
    this.ouvrirConnexion = this.ouvrirConnexion.bind(this);
    this.fermerConnexion = this.fermerConnexion.bind(this);
    this.ouvrirConfirmation = this.ouvrirConfirmation.bind(this);
    this.fermerConfirmation = this.fermerConfirmation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitSocialForm = this.submitSocialForm.bind(this);
    this.submitPaymentForm = this.submitPaymentForm.bind(this);
    this.deconnexion = this.deconnexion.bind(this);
    this.endFormSubmission = this.endFormSubmission.bind(this);

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
      connexionModal: false,
      confirmationModal: false,
      socialLoading: false
    };
  }

  componentDidMount() {
    this.deconnexion();
  }

  render() {
    const estConnecte = sessionStorage.getItem(`social`);
    return (
      <React.Fragment>
        <Form className="designForm" onSubmit={this.submitForm}>
          {estConnecte ?
            <React.Fragment>
              <Button className="buttonSocialDisconnexion" onClick={this.deconnexion}>Déconnexion du réseau social</Button>
              <h3 className="nomSocial">
                Bonjour {this.state.prenom + " " + this.state.nom}
              </h3>
            </React.Fragment>
            :
            <React.Fragment>
              <h2 className="titreDeSection">Informations Personnelles</h2>
              <Button className="buttonSocialConnexion" onClick={this.ouvrirConnexion}>Se connecter avec le réseau social</Button>
              <Row form1>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Nom</Label>
                    <Input type="text" pattern="[a-z]{1,20}" name="nom" id="lastname" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Prénom</Label>
                    <Input type="text" pattern="[a-z]{1,20}" name="prenom" id="firstname" onChange={this.onChange}/>
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
                    <Input type="text" pattern="[a-z]{1,20}" name="ville" id="city" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form1>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Province</Label>
                    <Input type="text" pattern="[a-z]{1,20}" name="province" id="province" onChange={this.onChange}/>
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup>
                    <Label for="nom">Code Postal</Label>
                    <Input type="text" pattern=".{6,6}" name="codePostal" id="postalCode" onChange={this.onChange}/>
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
                <Input type="text" pattern="[a-z]{1,20}" name="ccNom" id="cclastname" onChange={this.onChange} required="required"/>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="nom">Prénom</Label>
                <Input type="text" pattern="[a-z]{1,20}" name="ccPrenom" id="ccfirstname" onChange={this.onChange} required="required"/>
              </FormGroup>
            </Col>
          </Row>
          <Row form2>
            <Col md={6}>
              <FormGroup>
                <Label for="cardNumber">Numéro de la carte &nbsp;&nbsp;</Label>
                <InputMask pattern=".{16,17}" name="ccNoCarte" mask="9999999999999999" maskChar="" onChange={this.onChange} required="required"/>
              </FormGroup>
            </Col>
          </Row>
          <Row form3>
            <Col md={4}>
              <FormGroup>
                  <Label for="month">Mois d'expiration</Label>
                      <Input type="select" name="ccMoExp" id="ccmonth" onChange={this.onChange} value={this.state.value} required="required">
                      <option value="select">sélectionner</option>
                          <option value="1">Janvier</option>
                          <option value="2">Février</option>
                          <option value="3">Mars</option>
                          <option value="4">Avril</option>
                          <option value="5">Mai</option>
                          <option value="6">Juin</option>
                          <option value="7">Juillet</option>
                          <option value="8">Aout</option>
                          <option value="9" >Septembre</option>
                          <option value="10">Octobre</option>
                          <option value="11">Novembre</option>
                          <option value="12">Décembre</option>
                      </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="years">Année d'expiration</Label>
                <InputMask  pattern=".{4,}" name="ccAnExp" mask="9999" maskChar="" onChange={this.onChange} required="required"/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="cvv">cvv</Label>
                <InputMask pattern=".{3,}" name="ccCvv" mask="999" maskChar="" onChange={this.onChange} required="required"/>
              </FormGroup>  
            </Col>
          </Row>
          <Button
          type="submit"
          disabled={this.checkifMissingVariable()}
          className="buttonPrimary"
          >
            Envoyer
          </Button>
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
            <Button className="buttonDanger" onClick={this.fermerConnexion}>
              Fermer
            </Button>
            <Button disabled={this.state.socialLoading} className="buttonPrimary">
              {this.state.socialLoading ? "Chargement" : "Se connecter"}
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={this.state.confirmationModal} onHide={this.handleConfirmationClose}>
          <Modal.Header closeButton>
            <Modal.Title>Validation Informations Carte de Crédit</Modal.Title>
          </Modal.Header>
          <Form className="designForm" onSubmit={this.submitPaymentForm}>
            <Modal.Body>
              <p>Les informations ci-dessous sont elles correctes ?</p>
            <Row form1>
              <Col md={5}>
                <FormGroup>
                  <Label for="nom">Nom : </Label>
                  {this.state.ccNom}
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="prenom">Prénom : </Label>
                  {this.state.ccPrenom}
                </FormGroup>
              </Col>
            </Row>
            <Row form2>
              <Col md={5}>
                <FormGroup>
                  <Label for="card">Numéro de la carte : </Label>
                  {this.state.ccNoCarte}
                </FormGroup>
              </Col>
            </Row>
            <Row form3>
              <Col md={5}>
                <FormGroup>
                  <Label for="moisExpiration">Mois d'expiration : </Label>
                  {this.state.ccMoExp}
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="anneeExpiration">Année d'expiration : </Label>
                  {this.state.ccAnExp}
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="cvv">CVV : </Label>
                  {this.state.ccCvv}
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.fermerConfirmation} >
              Fermer
            </Button>
            <Button color="primary" variant="primary">
              Valider
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
    this.ouvrirConfirmation();
  }

  submitSocialForm(e) {
    e.preventDefault();
    this.setState({ socialLoading: true })
    axios.post("https://sitevente1-serveur.herokuapp.com/social/login", {
      email: this.state.socialEmail,
      password: this.state.socialPassword
    })
    .then(response => {
      var { data } = response.data;
      sessionStorage.setItem(`social`, data.Token)
      this.setState({
        nom: data.LastName,
        prenom : data.FirstName,
        adresse : data.Address,
        ville : data.City,
        province : data.Province,
        codePostal : data.PostalCode,
        connexionModal : false,
        socialLoading : false
      })
    })
    .catch(error => {
      this.setState({ socialLoading: false })
      alert('Échec de connexion au réseau social.\nVeuillez vérifier vos informations et réessayer.');
    });
  }

  submitPaymentForm(e) {
    e.preventDefault();
    const { amount } = this.props;
    const { ccPrenom, ccNom, ccNoCarte, ccCvv, ccMoExp, ccAnExp, prenom, nom } = this.state;
    var ccNumero = ccNoCarte.replace(/ /g,'');
    axios.post("https://sitevente1-serveur.herokuapp.com/tickets/buyTickets", {
      Authorization: sessionStorage.getItem(`social`),
      tickets: this.props.monPanier,
      amount,
      ccPrenom,
      ccNom,
      ccNumero,
      ccCvv,
      ccMoExp,
      ccAnExp,
      prenom,
      nom
    })
    .then(response => {
      alert(`${response.data.message}\r\nVeuillez prendre en note ce code de confirmation lié à votre achat:\r\n${response.data.confirmationCode}`);
      this.endFormSubmission();
    })
    .catch(error => {
      const { data } = error.response;
      if(data.action === "removeTickets") {
        this.endFormSubmission();
      }
      alert(`${data ? data.message : "Service non disponible"}`);
      this.fermerConfirmation();
    });
  }

  ouvrirConnexion() {
    this.setState({ connexionModal: true });
  }

  fermerConnexion() {
    this.setState({ connexionModal: false });
  }

  ouvrirConfirmation() {
    this.setState({ confirmationModal: true });
  }

  fermerConfirmation() {
    this.setState({ confirmationModal: false });
  }

  checkifMissingVariable(){
      if(this.state.ccNom === '' || 
      this.state.ccPrenom === '' ||
      this.state.ccNoCarte === '' || 
      this.state.ccMoExp === '' ||
      this.state.ccAnExp === '' || 
      this.state.ccCvv === '' || 
      this.state.adresse === '' || 
      this.state.codePostal === '' || 
      this.state.nom === '' || 
      this.state.prenom === '' || 
      this.state.province === '' || 
      this.state.ville === '')
      {
        return true;
      }
      else {
        return false;
      }
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

  endFormSubmission() {
    sessionStorage.removeItem(`panier`);
    this.props.endForm();
    this.deconnexion();
    this.setState({ confirmationModal: false });
  }
}

export default Formulaire;
