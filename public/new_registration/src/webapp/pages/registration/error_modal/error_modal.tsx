import * as React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IErrorModal {
    show: boolean,
    onClose: () => void
}
class ErrorModal extends React.Component<IErrorModal> {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header>
                    <Modal.Title>Fel!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Något gick fel! Vänligen kontrollera uppgifterna, försök igen eller kontakta info@designpriset.se</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => this.props.onClose()}>Stäng</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ErrorModal