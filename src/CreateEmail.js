import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CreateEmail.css';

class CreateEmail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            to: '',
            cc: '',
            subject: '',
            body: ''
        }

    }
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        });
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let sentEmails = JSON.parse(localStorage.getItem('emails'));
        let loggedInEmail = JSON.parse(localStorage.getItem('isLoggedIn'));
        
        let model = {
            to: this.state.to,
            from:loggedInEmail,
            cc: this.state.cc,
            body: this.state.body,
            subject: this.state.subject,
            isRead: true
        }

        if (sentEmails && sentEmails.length>0) {
            sentEmails.unshift(model);
            localStorage.setItem('emails', JSON.stringify( sentEmails))
        } else {
            localStorage.setItem('emails',JSON.stringify([model]))
        }

        this.handleClose()
    }

    render() {
        return (
            <>
                <button type='button' onClick={this.handleShow} style={{ padding: '8px 60px' }} className='btn btn-success btn-block'>Compose Email</button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Compose Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className='form-group-inline' onSubmit={this.handleSubmit} >
                            <label htmlFor='to'>To:</label>
                            <input onChange={this.handleChange} value={this.state.to} className='form-control' type='text' name='to' id='to' />
                            <label htmlFor='cc'>cc:</label>
                            <input onChange={this.handleChange} value={this.state.cc} className='form-control' type='text' name='cc' id='cc' />
                            <label htmlFor='subject'>Subject:</label>
                            <input onChange={this.handleChange} value={this.state.subject} className='form-control' type='text' name='subject' id='subject' />

                            <label htmlFor='body'>Body:</label>
                            <textarea onChange={this.handleChange} value={this.state.body} id="body" name="body" className='textarea' placeholder='Write your email here...'></textarea>
                            <Button variant="secondary" type='button' onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button  type="submit" variant="primary">Send</Button>
                        </form>
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default CreateEmail;