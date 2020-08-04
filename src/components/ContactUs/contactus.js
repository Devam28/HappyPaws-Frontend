/**
 * @author: Bhagyashree, Ramya 
 */
import React, { Component } from 'react';
import contactus from '../../assets/contactus1.jpg';
import facebook from '../../assets/facebook.jpg';
import insat from '../../assets/insta.png';
import twitter from '../../assets/twitter.png';
import { Form, Button, Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import * as utils from '../../baseUrl';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: null,
            query_subject: null,
            name: null,
            concern: null,
            email: null,
            nameError: null,
            subjectError: null,
            bodyError: null,
            emailError: null,
            flag: false
        };
    };


    //validation of all inputs
    isSubmitDisabled = () => {
        let nameIsRequired = false;
        let validEmail = false;

        if (this.state.fname === '' || !this.state.fname) {
            nameIsRequired = false;
            this.setState({
                nameError: null
            });
        } else {
            if (this.state.fname !== '') {
                nameIsRequired = true
                this.setState({
                    nameError: null
                });
            }

        }


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
                    emailError: "Please enter valid email"
                });
            }
        }
      
    }

    //email validation
    emailValidation = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);

    }


    //on change method for accessing the values
    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }

    //post api call after filling contact us form
    onClick = () => {
        axios.post(utils.baseUrl + 'contactus', { name: this.state.name, email: this.state.email, query_subject: this.state.query_subject, concern: this.state.concern })
            .then(function (res) {
                if (res.status === 200 && res.statusText === 'OK') {

                }

            })
            .catch(function (e) {
                console.log("ERROR ", e);
            })
    }

    render() {

        return (
            <React.Fragment>
                <NavbarComponent />
                <div className="search_css">

                    <Row >
                        <Jumbotron fluid className="class-jumbotron">
                            <Container>
                                <Row>
                                    <Col xs={6} md={4}>
                                        <Image src={contactus} height="280px" width="280px" roundedCircle />
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <h3 style={{ paddingTop: '6vh' }}>Contact Information</h3>
                                        <p >Phone: 902-999-9999</p>
                                        <p>Email: support@happypaws.com</p>
                                        <p>Address: 1113 WaterBridge Terminal,
                                        B3A A3B, Halifax, NS, Canada
                                </p>
                                        <Button variant="outline-info" style={{ marginLeft: '25px', marginRight: '25px' }}><img src={facebook} height="30px" width="30px" /></Button>
                                        <Button variant="outline-info" style={{ marginLeft: '25px', marginRight: '25px' }}><img src={twitter} height="30px" width="30px" /></Button>
                                        <Button variant="outline-info" style={{ marginLeft: '25px', marginRight: '25px' }}><img src={insat} height="30px" width="30px" /></Button>

                                    </Col>
                                </Row>
                            </Container>
                        </Jumbotron>
                    </Row>
                    <div className="contact-background">
                        <div className="contact">


                            <div><h3 className="heading"> Have Something on your mind?!! Let us know and we will help you out. </h3></div>
                            <div><h6 style={{
                                alignItems: 'center',
                            }}> Fill the below form and explain your concern!! </h6></div>

                            <Row>
                                {/* <form >
                    <label >Name:</label>
                    <Form.Control input type="text" className="form-control"
                    onChange = {this.onNameChange}/>
                    <div className="warning"> {this.state.nameError} </div>
                    
                    <label >Email: </label>
                    <Form.Control input type="text" className="form-control"
                    onChange = {this.onEmailChange}/>
                    <div className="warning"> {this.state.emailError} </div>

                    <label >Subject:</label>
                    <Form.Control input type="text" className="form-control"
                    onChange = {this.onSubjectChange} /> 
                    <div className="warning"> {this.state.subjectError} </div>

                    <label >Concerns:</label>     
                    <textarea cols="6" rows="3" type="password" className="form-control" 
                    onChange = {this.onBodyChange}/> 
                    <div className="warning"> {this.state.bodyError} </div>
                    <Button variant="primary" style={{margin:10}} onClick={() => {this.validateUser()}}> Submit Query </Button>
                </form> */}
                                <form className="form" onSubmit={this.onSubmit} action="/" >
                                    <div>
                                        <Container>
                                            <Row className="row" >

                                                <TextField
                                                    required
                                                    error={this.state.nameError !== null}
                                                    helperText={this.state.nameError}
                                                    onChange={e => this.onValueChange(e, 'name')}
                                                    label="First Name"
                                                    onBlur={this.isSubmitDisabled}
                                                    variant="outlined"
                                                />
                                            </Row>

                                            <Row className="row">
                                                <TextField
                                                    required
                                                    error={this.state.emailError !== null}
                                                    helperText={this.state.emailError}
                                                    onChange={e => this.onValueChange(e, 'email')}
                                                    label="Email"
                                                    type="email"
                                                    onBlur={this.isSubmitDisabled}
                                                    variant="outlined"
                                                />

                                            </Row>
                                            <Row>

                                                <TextField
                                                    label="Subject"
                                                    type="text"
                                                    onChange={e => this.onValueChange(e, 'query_subject')}
                                                    onBlur={this.isSubmitDisabled}
                                                    variant="outlined"
                                                />
                                            </Row>
                                            <Row>
                                                <TextField
                                                    className="textarea"
                                                    label="Enter your concern"
                                                    onChange={e => this.onValueChange(e, 'concern')}
                                                    multiline
                                                    rows={5}
                                                    variant="outlined"
                                                />
                                            </Row>
                                            <Row>
                                                <Button onClick={this.onClick} type="submit" size="lg" variant="outline-primary">Submit query</Button>{' '}

                                            </Row>
                                        </Container>

                                    </div>
                                </form>
                            </Row>
                        </div>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    };
}

export default ContactUs;