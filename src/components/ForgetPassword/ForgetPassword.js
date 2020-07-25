/************
 * Author: Moni Shah 
 **********/

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../../assets/Logo.png';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import * as utils from '../../baseUrl';

class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailError: null,
            password: '',
            confirmPassword: '',
            passwordError: null,
            confirmPasswordError: null,
            disabled: true,
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            snackbarMssg: ''
        };
    }
    // method for alert close
    handleClose = () => {
        this.setState({ open: false });
    };

// validation check for all inputs
    isSubmitDisabled = () => {
        let passwordIsValid = false;
        let confirmValid = false;
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

        if (this.state.password === "" || !this.state.password) {
            this.setState({
                passwordError: null
            });
        } else {
            if (this.state.password.length >= 6) {
                passwordIsValid = true;
                this.setState({
                    passwordError: null
                });
            } else {
                this.setState({
                    passwordError: "Your password must be at least 6 characters"
                });
            }
        }

        if (this.state.confirmPassword === "" || !this.state.confirmPassword) {
            this.setState({
                confirmPasswordError: null
            })
        }
        else {
            if (this.state.confirmPassword !== this.state.password) {
                this.setState({
                    confirmPasswordError: "Password Should Match"
                })
            }
            else {
                confirmValid = true
                this.setState({
                    confirmPasswordError: null
                })
            }
        }
        if (passwordIsValid && confirmValid && validEmail) {
            this.setState({
                disabled: false
            })
        }

    }
    // regex for email validation
    emailValidation = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
    }
    // onChange method for all inputs
    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }
// api call for forget password: PUT api call
    onClick = () => {
        const store = JSON.parse(localStorage.getItem('login'));
        axios.put(utils.baseUrl + "users/forgetPassword", { email: this.state.email, password: this.state.password })
            .then(res => {
                if (res.status === 200 && res.statusText === 'OK') {
                    this.setState({
                        email: '',
                        password: '',
                        confirmPassword: '',
                        snackbarMssg: 'Password Updated successfully. Please login!',
                        open: true,
                    })
                    // clearing the local storage
                    localStorage.clear();
                }

            })
            .catch(e => {
                this.setState({
                    snackbarMssg: "Something went wrong!",
                    open: true,
                    password: '',
                    confirmPassword: ''
                })
            })
    };

    render() {
        const { vertical, horizontal } = this.state
        return (
            <div className="main">
                <div className="App">
                    <form >
                        <div>
                            <a href="/"><CloseIcon style={{ float: "right", marginRight: "20px" }} fontSize="large"></CloseIcon></a>
                            <h2 className="mainheader">
                                <img
                                    alt=""
                                    src={logo}
                                    width="35"
                                    height="35"
                                />{' '}HappyPaws</h2>

                            <h4>Forget Password</h4>
                            <Container className="centered">
                                <Row>
                                    <Col>
                                        <div>
                                            <div className="custom-class">
                                            <div className="custom-class">
                                                <TextField className="input-class"
                                                    floatinglabeltext="Registered Email"
                                                    type="email"
                                                    error={this.state.emailError !== null}
                                                    helperText={this.state.emailError}
                                                    value={this.state.email}
                                                    onChange={e => this.onValueChange(e, 'email')}
                                                    id="standard-basic" required label="Registered Email"
                                                    variant="outlined"
                                                    onBlur={this.isSubmitDisabled} />
                                            </div>
                                                <div className="custom-class">
                                                    <TextField className="input-class"
                                                        floatinglabeltext="Password"
                                                        type="password"
                                                        error={this.state.passwordError !== null}
                                                        helperText={this.state.passwordError}
                                                        onChange={e => this.onValueChange(e, 'password')}
                                                        id="standard-basic" required label="Password"
                                                        variant="outlined"
                                                        value={this.state.password}
                                                        onBlur={this.isSubmitDisabled} /></div>
                                                <div className="custom-class">
                                                    <TextField className="input-class"
                                                        floatinglabeltext="Confirm Password"
                                                        type="password"
                                                        error={this.state.confirmPasswordError !== null}
                                                        helperText={this.state.confirmPasswordError}
                                                        onChange={e => this.onValueChange(e, 'confirmPassword')}
                                                        id="standard-basic" required label="Confirm Password"
                                                        variant="outlined"
                                                        value={this.state.confirmPassword}
                                                        onBlur={this.isSubmitDisabled} /></div>
                                            </div>

                                        </div>
                                        <div className="button-class">
                                              <Button disabled={this.state.disabled} variant="primary" type="button" onClick={this.onClick} size="lg" active>
                                                Submit
                    </Button>{' '}
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <a href="/">Navigate to HappyPaws? Click here</a>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </form>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    message={this.state.snackbarMssg}
                    autoHideDuration={2000}
                    key={vertical + horizontal}></Snackbar>
            </div>
        );
    }
}

export default ForgetPassword;