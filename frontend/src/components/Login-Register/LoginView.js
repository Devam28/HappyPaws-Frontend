import React, { Component } from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import './Login.css'

class LoginView extends Component {
    render() {
        return (
            <React.Fragment>
                <Form className="login-form">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Col xs={8}>
                                <TextField
                                                className="sample"
                                                required
                                                id="outlined-required"
                                                type = "email"
                                                size="small"
                                                variant="outlined"
                                                placeholder="John.Doe@gmail.com"
                                            />
                                </Col>

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Col xs={8}>
                                <TextField
                                                className="sample"
                                                required
                                                id="outlined-required"
                                                type = "password"
                                                size="small"
                                                variant="outlined"
                                                placeholder="Enter Password"
                                            />
                                </Col>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                             </Button>
                        </Form>
            </React.Fragment>
        )
    }
}

export default LoginView
