/************
 * Author: Moni Shah 
 **********/

import React, { Component, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../../App.css';
import './Shareyourstory.css';
import TextField from '@material-ui/core/TextField';
import Jodit from './Jodit';
import Button from 'react-bootstrap/Button';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import share_gif from '../../assets/share_gif.gif';
import Snackbar from '@material-ui/core/Snackbar';
import * as utils from '../../baseUrl';

class Shareyourstory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailError: null,
            disabled: true,
            counter: 'Your Story',
            store: JSON.parse(localStorage.getItem('login')),
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            snackbarMssg: ''
        }
    }
    static propTypes = {
        history: PropTypes.object.isRequired
      }

// regex for email validation
    emailValidation = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
    }

    // check for validations of all inputs
    isSubmitDisabled = () => {
        let validEmail = false;
        let jodit = this.state.counter !== '';

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
        if (validEmail && jodit) {
            this.setState({
                disabled: false
            });
        }
    }

    // for fetching values of email
    componentDidMount() {
        if(this.state.store && this.state.store.login === true) {
           this.setState({email: this.state.store.email});
        }
    }
   // on change method for all inputs 
    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }
     // function call for alert close
     handleClose = () => {
        this.setState({ open: false });
    };

    update = (value) => {
        return () => {
            this.setState({
                counter: value
            });
        }
    }
// api call for sharing story: POST Api call
    onClickSubmit = () => {
        axios.post(utils.baseUrl + "sharestory/", { email: this.state.email, story: this.state.counter },{ headers: { "Content-Type": "application/json", "x-auth-token": this.state.store.token }})
            .then(res => {
                if (res.status === 200 && res.statusText === 'OK') {
                    localStorage.setItem('shareStory', JSON.stringify({
                        shareStory: true
                    }));
                    this.props.history.push("/")
                } 
            })
            .catch(e=> {
                console.log("ERROR ", e);
                this.setState({
                    snackbarMssg: "Something went wrong. Please login if not and try again",
                    open: true,
                    email: '',
                    counter: '',
                })
            })
    }


    render() {
        const { vertical, horizontal } = this.state
        return (
            <div>
                <NavbarComponent />
                <div className="main-class">
                    <form >
                        <h1 className="header-style">Share Your Story</h1>
                        <img
                            src={share_gif}
                            alt="First slide"
                            height="350px"
                            width="70%"
                        />
                         <h6> Your experience is very precious and would motivate many others.</h6>
                        <p>Provide us your email ID for subscriptions to read every new story posted!</p>
                        <Container>
                            <Row>
                                <Col>
                                    <div style={{ marginBottom: "20px", textAlign:"center"}}>
                                        <TextField className="input-class" id="standard-basic" label="Enter your Email"
                                            floatinglabeltext="Email"
                                            type="email"
                                            value={this.state.email}
                                            error={this.state.emailError !== null}
                                            helperText={this.state.emailError}
                                            onChange={e => this.onValueChange(e, 'email')}
                                            id="standard-basic" label="Email"
                                            onBlur={this.isSubmitDisabled} required />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div className="editor-style">
                            <Jodit data={this.update.bind(this)} />
                        </div>
                        <div className="button-style">
                             <Button disabled={this.state.disabled} type="button" size="lg" onClick={this.onClickSubmit} variant="outline-primary">Submit</Button>{' '}
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
                <Footer />
            </div>
        );
    }
}
Shareyourstory = withRouter(Shareyourstory);
export default Shareyourstory;