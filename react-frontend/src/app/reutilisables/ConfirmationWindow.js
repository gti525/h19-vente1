import React from 'react';
import { Modal } from 'react-bootstrap';
import { Form, Row, Button } from 'reactstrap';

const ConfirmationWindow = ({ confirmationMessage, confirmationCode, closeConfirmationWindow} ) => {
    return (
        <Modal show={true} onHide={closeConfirmationWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Validation Informations Carte de Crédit</Modal.Title>
        </Modal.Header>
        <Form className="designForm" onSubmit={closeConfirmationWindow}>
          <Modal.Body>
            <h1>Confirmation d'achat</h1>
          <Row>
            {confirmationMessage}
          </Row>
          <Row>
            Veuillez prendre en note le code de confirmation lié à votre achat:
          </Row>
          <Row>
          <h3>{confirmationCode}</h3>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" variant="primary">
          OK
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    );
}

export default ConfirmationWindow;
