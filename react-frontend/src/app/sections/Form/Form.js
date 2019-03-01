import React, { Component } from "react";

import { Form, FormGroup, Label, Input,Row, Col, Button } from 'reactstrap';

class Formulaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
        <Form>
        <Row form1>
          <Col md={5}>
            <FormGroup>
              <Label for="nom">Nom</Label>
              <Input type="text" name="Nom sur la carte" id="lastname" />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label for="nom">Prénom</Label>
              <Input type="text" name="Prénom sur la carte" id="firstname" />
            </FormGroup>
          </Col>
        </Row>
        <Row form2>
          <Col md={4}>
            <FormGroup>
              <Label for="cardNumber">Numéro de la carte</Label>
              <Input type="text" name="cardNumber" id="cardNumber"/>
            </FormGroup>
          </Col>
        </Row>
        <Row form3>
          <Col md={2}>
            <FormGroup>
                <Label for="month">Mois d'expiraiton</Label>
                    <Input type="select" name="selectMonth" id="month">
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
              <Label for="Année d'expiration">Année d'Expiration</Label>
              <Input type="text" name="years" id="years"/>
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <Label for="cvv">CVV</Label>
              <Input type="text" name="cvv" id="cvv"/>
            </FormGroup>  
          </Col>
        </Row>

        <Button>Envoyer</Button>
        
      </Form>
    );
  }
}
export default Formulaire;
