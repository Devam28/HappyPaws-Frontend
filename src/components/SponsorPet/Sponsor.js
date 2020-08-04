/************
 * Author: Devam Shah 
 **********/

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Form, Button, Row, Col, Container, Dropdown, DropdownButton, Alert } from 'react-bootstrap'
import CreditCardInput from 'react-credit-card-input';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './Sponsor.css';
import * as utils from '../../baseUrl';

class Sponsor extends Component {
    // Initialize state variables
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            cardNumber: '',
            cvc: '',
            expiry: '',
            name: '',
            address1: '',
            city: '',
            postalCode: '',
            state: '',
            disabled: true,
            emailError: null,
            failureMsg: false,
            message: null,
            id1: this.props.location.id,
            pets: [],
            doneLoading: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    // GET API for fetching pet image and description
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(utils.baseUrl + 'sponsor/' + id)
            .then(res => {
                this.setState({ pets: res.data });
            }).then(() => {
                this.setState({
                    doneLoading: true
                })
            })
    }
    // POST API to store data in the database
    onSubmit = () => {
        this.setState({
            message: true
        })
        // Object that will be passed to POST request
        const data = {
            email: this.state.email,
            cardNumber: this.state.cardNumber,
            cvc: this.state.cvc,
            expiry: this.state.expiry,
            name: this.state.name,
            address1: this.state.address1,
            city: this.state.city,
            postalCode: this.state.postalCode,
            state: this.state.state

        }
        // POST request using axios
        axios.post(utils.baseUrl + 'sponsor', data)
            //Handling Promise
            .then(function (res) {
                if (res.status === 200 && res.statusText === 'OK') {
                } else {
                    // flag = false

                    this.setState({
                        message: false
                    })
                }
            }).then(() => {
                this.setState({
                    message: "Thank you for sponsoring "
                })
            })
            .catch(function (e) {
                this.setState({
                    message: "Payment Failed! "
                })
            })


    }
    // All validations performed here
    isSubmitDisabled = () => {

        let validEmail = false;


        if (this.state.email === "") {
            this.setState({
                emailError: null
            });
        } else {
            if (this.emailValidation(this.state.email)) {
                validEmail = true
                this.setState({
                    emailError: null
                });
            } else {
                this.setState({
                    emailError: "Please enter valid email!"
                });
            }
        }

        if (validEmail && this.state.name !== "" && this.state.address1 !== "" && this.state.city !== "") {
            this.setState({
                disabled: false
            })
        }
        else {
            this.setState({
                disabled: true
            })
        }
    }
    // Regex for email validation
    emailValidation = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
    }
    // Setting the state when value changes
    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }

    render() {
        let pet = this.state.pets;
        return (
            <React.Fragment>
                {/* Preventing rendering until data is done loading (using GET API) */}
                {this.state.doneLoading ? (
                    <div>
                        <NavbarComponent />
                        <Container fluid>
                            {this.state.message ? (
                                <Alert variant="success">
                                    <Alert.Heading>Payment Success</Alert.Heading>
                                    <p>
                                        You have successfully sponsored {pet.name}
                                    </p>

                                </Alert>) : (<div></div>)}
                            <div className="main-root">
                                <Row noGutters="true" className="justify-left" style={{ paddingLeft: '50px' }}>
                                    <Col lg={5} md={5} sm={12} xs={12}>
                                        <Row className="justify-left" style={{ paddingLeft: '25px' }}>
                                            <div className="img-outline">
                                                <img src={pet.image} style={{ height: '100%', width: '75%' }}></img>
                                            </div>
                                        </Row>
                                        <Row className="justify-left" style={{ paddingLeft: '25px' }}>
                                            <div className="description-outline">
                                                <Row className="justify-left" style={{ paddingLeft: '2rem', paddingBottom: '0rem' }}>
                                                    <p style={{ fontSize: '1.3rem', fontWeight: '500' }}>Something About Me!</p>
                                                </Row>
                                                <hr></hr>
                                                <Row className="justify-left" style={{ paddingLeft: '2rem', textAlign: 'left' }}>
                                                    <p>{pet.description}</p>
                                                </Row>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col lg={5} md={5} sm={12} xs={12}>
                                        <div className="pay-outline">
                                            <Form>
                                                <Row className="justify-left padding-bot">
                                                    <Form.Label className="labelClass">Email</Form.Label>
                                                </Row>
                                                <Row className="justify-left">
                                                    <TextField
                                                        className="full-width"
                                                        required
                                                        onChange={e => this.onValueChange(e, 'email')}
                                                        id="outlined-required"
                                                        type="email"
                                                        onBlur={this.isSubmitDisabled}
                                                        size="small"
                                                        error={this.state.emailError !== null}
                                                        helperText={this.state.emailError}
                                                        variant="outlined"
                                                        placeholder="John.Doe@gmail.com"
                                                    />
                                                </Row>
                                                <Row className="justify-left padding-bot">
                                                    <Form.Label className="labelClass">Card Information</Form.Label>
                                                </Row>
                                                <Row className="justify-left">
                                                    <CreditCardInput style={{ width: '100%' }}
                                                        cardNumberInputProps={{ value: this.state.cardNumber, onChange: e => { this.onValueChange(e, 'cardNumber') } }}
                                                        cardExpiryInputProps={{ value: this.state.expiry, onChange: e => { this.onValueChange(e, 'expiry') } }}
                                                        cardCVCInputProps={{ value: this.state.cvc, onChange: e => { this.onValueChange(e, 'cvc') } }}
                                                        fieldClassName="input"
                                                        className="full-width"
                                                        onChange={e => this.onValueChange(e, 'cardNumber')}
                                                    />
                                                </Row>
                                                <Row className="justify-left padding-bot">
                                                    <Form.Label className="labelClass ">Name On Card</Form.Label>
                                                </Row>
                                                <Row className="justify-left">
                                                    <TextField
                                                        className="sample full-width"
                                                        required
                                                        id="outlined-required"
                                                        onBlur={this.isSubmitDisabled}
                                                        onChange={e => this.onValueChange(e, 'name')}
                                                        size="small"
                                                        variant="outlined"
                                                        placeholder="John Doe"
                                                    />
                                                </Row>
                                                <Row className="justify-left padding-bot">
                                                    <Form.Label className="labelClass">Billing Address</Form.Label>
                                                </Row>
                                                <Row className="justify-left padding-bot">
                                                    <TextField
                                                        className="sample full-width"
                                                        id="outlined-required"
                                                        onChange={e => this.onValueChange(e, 'address1')}
                                                        required
                                                        size="small"
                                                        onBlur={this.isSubmitDisabled}
                                                        variant="outlined"
                                                        placeholder="Address Line 1"
                                                    />
                                                </Row>
                                                <Row className="justify-left padding-bot">
                                                    <TextField
                                                        className="sample full-width"
                                                        id="outlined-required"
                                                        size="small"
                                                        variant="outlined"
                                                        placeholder="Address Line 2"
                                                    />
                                                </Row>
                                                <Row className="justify-left padding-bot">
                                                    <Col xs={12} sm={12} lg={6} md={6} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                                        <TextField
                                                            className="sample full-width"
                                                            id="outlined-required"
                                                            size="small"
                                                            variant="outlined"
                                                            onBlur={this.isSubmitDisabled}
                                                            placeholder="City"
                                                            onChange={e => this.onValueChange(e, 'city')}
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={12} lg={6} md={6} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                                        <TextField
                                                            className="sample full-width"
                                                            id="outlined-required"
                                                            onChange={e => this.onValueChange(e, 'postalCode')}
                                                            size="small"
                                                            variant="outlined"
                                                            onBlur={this.isSubmitDisabled}
                                                            placeholder="Postal Code"
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="justify-left padding-bot">
                                                    <TextField
                                                        className="sample full-width"
                                                        id="outlined-required"
                                                        size="small"
                                                        onBlur={this.isSubmitDisabled}
                                                        onChange={e => this.onValueChange(e, 'state')}
                                                        variant="outlined"
                                                        placeholder="State"
                                                    />
                                                </Row>
                                                <hr>
                                                </hr>
                                                <Row className="justify-left padding-bot" style={{ width: '100%' }}>
                                                    <Button disabled={this.state.disabled} className="full-width" variant="primary" onClick={this.onSubmit} block>Support Me!</Button>
                                                </Row>
                                            </Form>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <Footer />
                    </div>
                ) : (<div />)}
            </React.Fragment>
        )
    }
}

export default Sponsor
