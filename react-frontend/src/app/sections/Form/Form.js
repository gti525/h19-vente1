import React, { Component } from "react";
import { Form, FormGroup, Label, Input,Row, Col, Button } from 'reactstrap';
import InputMask from 'react-input-mask';
import "./Form.css";

class Formulaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
        <Form className="designForm">
        <Row form1>
          <Col md={5}>
            <FormGroup>
              <Label for="nom">Nom</Label>
              <Input type="text" name="Nom_carte" id="lastname" />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label for="nom">Prénom</Label>
              <Input type="text" name="Prénom_carte" id="firstname" />
            </FormGroup>
          </Col>
        </Row>
        <Row form2>

          <Col md={6}>
            <FormGroup>
              <Label for="cardNumber">Numéro de la carte </Label>
              <InputMask mask="9999 9999 9999 9999" maskChar=" " />
            </FormGroup>
          </Col>

        </Row>
        <Row form3>
          <Col md={2}>
            <FormGroup>
                <Label for="month">Mois d'expiration</Label>
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
              <Label for="years">Année d'expiration</Label>
              <InputMask  mask="9999" maskChar=" " />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
            <Label for="cvv">cvv</Label>
              <InputMask  mask="999" maskChar=" " />
            </FormGroup>  
          </Col>
        </Row>

        <Button>Envoyer</Button>
        
      </Form>
    );
  }
}
export default Formulaire;
