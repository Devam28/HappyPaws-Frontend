import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Form, Col } from 'react-bootstrap'
import { Card, Nav } from 'react-bootstrap'
import LoginView from './LoginView'
import RegisterView from './RegisterView'
import './Login.css'    

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            ActiveComponent: 'Login'
        }
        // this.closeModal = this.closeModal.bind(this);
    }
    LoginClicked = () => {
        this.setState({
            ActiveComponent: 'Login'
        })
    }
    RegisterClicked = () => {
        this.setState({
            ActiveComponent: 'Register'
        })
    }

    render() {
        const selectedComponenet = this.state.ActiveComponent;
        let comp;
        if(selectedComponenet == 'Login') {
            comp = <LoginView></LoginView>
        }
        else {
            comp = <RegisterView></RegisterView>
        }
        return (
            <Modal onHide={this.props.onHide}
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    {/* <div className = "modal-login-title"> */}
                    {/* <Modal.Title>
                        <h1>Hello</h1>
                    </Modal.Title> */}
                    {/* </div> */}
                    {/* <div> */}
                    <Modal.Title id="contained-modal-title-vcenter">
                        <Card>
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="#first">
                                    <Nav.Item>
                                        <Nav.Link href="#first" onClick = {this.LoginClicked}>Login</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#link" onClick = {this.RegisterClicked}>Register</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                        </Card>
                    </Modal.Title>
                    {/* </div> */}
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        {comp}
                    </div>
                </Modal.Body>
                
            </Modal>
        )
    }
}

export default Login
