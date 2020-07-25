import React, { Component } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './Enquire.css';
import Footer from '../Footer/Footer';
import TextField from '@material-ui/core/TextField';
import NavbarComponent from '../Navbar/Navbar';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import { id } from 'date-fns/locale';


class Enquire extends Component {
    constructor(props) {
        super(props);
       
      }
    state = {
        fname: '',
        lname:'',
        email: '',
        password: '',
        number: '',
        country:'',
        postal: '',
        nameError: null,
        emailError: null,
        numberError:null,
        postalError: null,
        disabled: true,
        pets: [],
        image: null,
        id1:this.props.location.id

    }
    componentDidMount() {
        let id2 = this.state.id1
        Object.values(id2).map(i =>{
            axios.get('http://localhost:5000/enquiry/'+i)
          .then(res => {
            this.setState({pets: res.data});
          })
            console.log(i)
        })
      }

    isSubmitDisabled = () => {
        let nameIsRequired = false;
        let validEmail = false;
        let validNumber = false;
        let validPostal = false;

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

        if (this.state.number.length > 10 ) {
            validNumber = false
            this.setState({
                numberError: "Enter a valid contact number"
            });
        } else {
            validNumber = true
                this.setState({
                    numberError: null
                });

        }
        
        if ( this.postalValidation(this.state.postal) ) {
            validPostal = false;
            this.setState({
                postalError: "Enter valid postal code"
            });
        } else {
            if (this.state.postal.length>6) {
                validPostal = false
                this.setState({
                    postalError: "Enter valid postal code"
                });
            }
            else{
                validPostal = true
                this.setState({
                    postalError: null
                });
            }

        }
    }

    emailValidation = (email) => {
        return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
       
    }

    postalValidation = (postal) => {
        return new RegExp(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(postal);
       
    }

    onValueChange = (e, label) => {
        const nextState = {};
        nextState[label] = e.target.value;;
        this.setState(nextState);
    }

    onClick = () => {
        axios.post('http://localhost:5000/enquiry', { fname: this.state.fname, lname: this.state.lname, email: this.state.email, number: this.state.number, country:this.state.country, postal: this.state.postal, enquiry: this.state.enquiry })
            .then(function (res) {
                if( res.status === 200 && res.statusText === 'OK') {
                }

            })
            .catch(function (e) {
                console.log("ERROR ", e);
            })
    }

    render() {
        let pet= this.state.pets;
        return (
            <div >
                <NavbarComponent />
                <div className="bg">
                    <h3 className="font1">Enquire</h3>
                    <img className="im1" src={pet.image} />
                    <p className="enquire">Ask about {pet.name}</p>
                    <br />
                    <br />
                    <p className="enquire">To Daisy Shelter</p>

                    <br />
                    <Link className="enquire" to="/register">Login to Continue </Link>
                    <p className="enquire"> &nbsp; Or Enquire as a Guest</p>

                    <form className="form" onSubmit={this.onSubmit} >
                        <div>
                            <Container>
                                <Row className="row" >

                                    <TextField
                                        required
                                        error={this.state.nameError !== null}
                                        helperText={this.state.nameError}
                                        onChange={e => this.onValueChange(e, 'fname')}
                                        label="First Name"
                                        onBlur={this.isSubmitDisabled} 
                                        variant="outlined"
                                    />

                                    <TextField
                                        label="Last Name"
                                        variant="outlined"
                                        onChange={e => this.onValueChange(e, 'lname')}
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
                                    <TextField
                                        label="Contact Number"
                                        type="number"
                                        error={this.state.numberError !== null}
                                        helperText={this.state.numberError}
                                        onChange={e => this.onValueChange(e, 'number')}
                                        onBlur={this.isSubmitDisabled} 
                                        variant="outlined"
                                    />
                                </Row>
                                <Row>
                                    <select className="drop"
                                    onChange={e => this.onValueChange(e, 'country')}>
                                        <option>Select a country</option>
                                        <option>Canada</option>
                                        <option>US</option>
                                    </select>
                                    <TextField
                                        label="Postal Code"
                                        type="text"
                                        error={this.state.postalError !== null}
                                        helperText={this.state.postalError}
                                        onChange={e => this.onValueChange(e, 'postal')}
                                        onBlur={this.isSubmitDisabled} 
                                        variant="outlined"
                                    />
                                </Row>
                                <Row>
                                    <TextField
                                        className="textarea"
                                        label="Enter your message"
                                        onChange={e => this.onValueChange(e, 'enquiry')}
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                    />
                                </Row>
                                <Row>
                                <Link to="/profile"> <Button type="submit" size="lg" variant="outline-primary">Enquire</Button>{' '}</Link>
                                <Link to="/profile"> <Button onClick={this.onClick} type="submit" size="lg" variant="outline-primary">Enquire</Button>{' '}</Link>
                                       
                                </Row>            
                                </Container>

                        </div>
                    </form>
                    <Footer />
                </div>
            </div>

        );
    }
}

export default Enquire;