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
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitSocialForm = this.submitSocialForm.bind(this);
    this.deconnexion = this.deconnexion.bind(this);
    this.validerInformation = this.validerInformation.bind(this);

    const { index, title, date, venue  } = this.props;

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
                <Input type="text" name="ccNom" id="cclastname" onChange={this.onChange} required="required"/>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="nom">Prénom</Label>
                <Input type="text" name="ccPrenom" id="ccfirstname" onChange={this.onChange} required="required"/>
              </FormGroup>
            </Col>
          </Row>
          <Row form2>
            <Col md={6}>
              <FormGroup>
                <Label for="cardNumber">Numéro de la carte &nbsp;&nbsp;</Label>
                <InputMask name="ccNoCarte" mask="9999 9999 9999 9999" maskChar=" " onChange={this.onChange} required="required"/>
              </FormGroup>
            </Col>
          </Row>
          <Row form3>
            <Col md={4}>
              <FormGroup>
                  <Label for="month">Mois d'expiration</Label>
                      <Input type="select" name="ccMoExp" id="ccmonth" onChange={this.onChange} value={this.state.value} required="required">
                      <option value="select">sélectionner</option>
                          <option value="Janvier">Janvier</option>
                          <option value="Février">Février</option>
                          <option value="Mars">Mars</option>
                          <option value="Avril">Avril</option>
                          <option value="Mai">Mai</option>
                          <option value="Juin">Juin</option>
                          <option value="Juillet">Juillet</option>
                          <option value="Aout">Aout</option>
                          <option value="Septembre" >Septembre</option>
                          <option value="Octobre">Octobre</option>
                          <option value="Novembre">Novembre</option>
                          <option value="Decembre">Decembre</option>
                      </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="years">Année d'expiration</Label>
                <InputMask  name="ccAnExp" mask="9999" maskChar=" " onChange={this.onChange} required="required"/>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
              <Label for="cvv">cvv</Label>
                <InputMask name="ccCvv" mask="999" maskChar=" " onChange={this.onChange} required="required"/>
              </FormGroup>  
            </Col>
          </Row>
          <Button type="submit" disabled={'checkifMissingVariable()'} onClick={this.validerInformation}  variant="primary" >Envoyer</Button>
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

        <Modal show={this.state.connexionModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Validation Informations Carte de Crédit</Modal.Title>
          </Modal.Header>
          <Form className="designForm" onSubmit={this.submitSocialForm}>
            <Modal.Body>
              <p>Les informations ci-dessous sont elles correcte ?</p>
            <Row form1>
              <Col md={5}>
                <FormGroup>
                  <Label for="nom">Nom:</Label>
                  <Input type="text" name="nameCard" id="nameCard" value={this.state.ccNom} />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="prenom">Prénom</Label>
                  <Input type="text" name="prenom" id="prenom" value={this.state.ccPrenom}/>
                </FormGroup>
              </Col>
            </Row>
            <Row form2>
              <Col md={5}>
                <FormGroup>
                  <Label for="card">Numéro de la carte :</Label>
                  <Input type="text" name="card" id="card" value={this.state.ccNoCarte} />
                </FormGroup>
              </Col>
            </Row>
            <Row form3>
              <Col md={5}>
                <FormGroup>
                  <Label for="moisExpiration">Mois d'expiration</Label>
                  <Input type="text" name="moisExpiration" id="moisExpiration" value={this.state.ccMoExp}/>
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="anneeExpiration">Année d'expiration</Label>
                  <Input type="text" name="anneeExpiration" id="anneeExpiration" value={this.state.ccAnExp}/>
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="cvv">CVV</Label>
                  <Input type="text" name="cvv" id="cvv" value={this.state.ccCvv}/>
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.fermerConnexion} >
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
  validerInformation(){
    this.setState({
      connexionModal: true, 
      ccNom : this.state.ccNom,
      ccPrenom: this.state.ccPrenom,
      ccNoCarte: this.state.ccNoCarte,
      ccMoExp: this.state.ccMoExp,
      ccAnExp: this.state.ccAnExp,
      ccCvv: this.state.ccCvv,
    })
  }
  ouvrirConnexion() {
    this.setState({ connexionModal: true })
  }

  fermerConnexion() {
    this.setState({ connexionModal: false })
  }

  checkifMissingVariable(){
      if(this.state.ccNom=='' || 
      this.state.ccPrenom=='' ||
      this.state.ccNoCarte =='' || 
      this.state.ccMoExp =='' ||
      this.state.ccAnExp =='' || 
      this.state.ccCvv == '')
      {
        return true;
      }
      else
         return false;
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
