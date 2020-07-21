import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import './Login.css'
class RegisterView extends Component {
    render() {
        return (
            <React.Fragment>
                <Form className="register-form">
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
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


                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
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
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Col xs={8}>
                            <TextField
                                                className="sample"
                                                required
                                                id="outlined-required"
                                                type = "password"
                                                size="small"
                                                variant="outlined"
                                                placeholder="Confirm Password"
                                            />
                            </Col>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row >
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Col xs={8}>
                            <TextField
                                                className="sample"
                                                required
                                                id="outlined-required"
                                                type = "text"
                                                size="small"
                                                variant="outlined"
                                                placeholder="101 Oxford Street"
                                            />
                            </Col>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Col xs={4}>
                                <Form.Control />
                            </Col>
                            <Form.Label>State</Form.Label>
                            <Col xs={4}>
                                <Form.Control as="select" defaultValue="ON">
                                    <option>ON</option>
                                    <option>BC</option>
                                    <option>AB</option>
                                    <option>NS</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form.Row>



                    <Button variant="primary" type="submit">
                        Submit
  </Button>
                </Form>
            </React.Fragment>
        )
    }
}

export default RegisterView
