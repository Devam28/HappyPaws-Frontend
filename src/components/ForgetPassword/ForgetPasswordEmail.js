/************
 * Author: Moni Shah 
 **********/

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Row, Col, Container } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../../assets/Logo.png';
import axios from 'axios';
import { withRouter } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import * as utils from '../../baseUrl';

class ForgetPasswordEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailError: null,
            disabled: true,
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            snackbarMssg: ''
        };  
    }
    static propTypes = {
        history: PropTypes.object.isRequired
      }
// validation check for all input
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
        if (validEmail ) {
                this.setState({
                    disabled: false
                });

        }
    }
// regex call for email validation
    emailValidation = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
    }

    // function call for alert close
    handleClose = () => {
        this.setState({ open: false });
    };

// onchange method for inputs
    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }

// api call for receving mail for resetting password: POST Api call
    onClick = () => {
        axios.post(utils.baseUrl + "users/forgetPasswordMail", { email: this.state.email})
            .then(res => {
                if (res.status === 200 && res.statusText === 'OK') {
                    localStorage.setItem('mailSent', JSON.stringify({
                        mailSent: true
                    }));
                    this.props.history.push("/")
                } 
            })
            .catch(e => {
                this.setState({
                    snackbarMssg: "Email is not registered. Please Register!",
                    open: true,
                    email: '',
                })
            })
    }
    render() {
        const { vertical, horizontal } = this.state
        return (
            <div className="main">
                <div className="App">
                    <form  >
                        <div>
                            <a href="/"><CloseIcon style={{ float: "right", marginRight: "20px" }} fontSize="large"></CloseIcon></a>
                            <h2 className="mainheader">
                                <img
                                    alt=""
                                    src={logo}
                                    width="35"
                                    height="35"
                                />{' '}HappyPaws</h2>
                            <br />
                            <h4>Forget Password</h4>
                            <h6><i>An e-mail would be sent to you on your registered e-mail Id</i></h6>

                            <Container className="centered">
                                <Row>
                                    <Col>
                                        <div>
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
                                        </div>
                                        <div className="button-class">

                                              <Button disabled={this.state.disabled} variant="primary" type="button" onClick={this.onClick} size="lg" active>
                                                Submit
                    </Button>{' '}
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
ForgetPasswordEmail = withRouter(ForgetPasswordEmail);
export default ForgetPasswordEmail;