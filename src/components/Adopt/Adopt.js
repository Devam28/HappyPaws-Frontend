/************
 * Author: Vigneshwari Ravichandran
 **********/

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import PropTypes from 'prop-types';

import * as utils from '../../baseUrl';
import './Adopt.css';


import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';



const primeState = {
  email: '',
  comment: '',
  adoptDate:'',
  pets: [],
  store: JSON.parse(localStorage.getItem('login')),
  emailError: null,
  commentError: null,
  message: null,
  disabled: true,
}

class Adopt extends Component {
  constructor(props) {
    super(props)
    this.state = primeState;
  }

   static propTypes = {
        history: PropTypes.object.isRequired
      }


  isSubmitDisabled = () => {
    let commentRequired = false;
    let validEmail = false;


    if (this.state.comment === '' || !this.state.comment) {
      commentRequired = false;
      this.setState({
        commentError: null
      });
    } else {
      if (this.state.comment !== '') {
        commentRequired = true
        this.setState({
          commentError: null
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
          emailError: "Please enter valid email!"
        });
      }
  
    }


    if (validEmail) {
      if (this.state.comment === '') {
        this.setState({
          commentError: "Please enter comment"
        });
      } else if (validEmail && commentRequired) {
        this.setState({
          disabled: false
        });
      }

    }
  }

  emailValidation = (email) => {
    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
  }

  componentDidMount() {
    if(this.state.store && this.state.store.login === true) {
       this.setState({email: this.state.store.email});
    }
    const id1 = this.props.match.params.id
    axios.get(utils.baseUrl + 'adopt/' + id1)
        .then(res => {
            this.setState({ pets: res.data });
        }).then(()=>{
            this.setState({
                doneLoading: true
            })
        })
}

  onValueChange = (e, label) => {
    const nextState = {};
    nextState[label] = e.target.value;;
    this.setState(nextState);
  }


  formSubmit = (event) => {
    let pet = this.state.pets;
    axios.post(utils.baseUrl+'adopt/adopt',{email:this.state.email,adoptDate:this.state.adoptDate,userAnswer: this.state.comment,petName:this.state.pets.name},{ headers: { "Content-Type": "application/json", "x-auth-token": this.state.store.token }})
    .then(function(res){
        if(res.status===200&&res.statusText==='OK'){
     
        }
    }).then(() => {
      this.setState({
          message: "Thank you for sponsoring "
      })
  })
    .catch(function(e){
    console.log("Error"+e);
    })
    //alert("Adoption Appointment booked on" +this.state.adoptDate+"for the pet"+this.state.pets.name+"! A confirmation email will be sent to you for your reference")
  }

  render() {
    let pet = this.state.pets;
    const id = pet._id
    return (
      <div className="FormAdopt">
        <NavbarComponent />
      
     
      
        <h3><i><b>Adopt</b></i></h3>
        <center><b>Would you like to adopt  {pet.name} ? Fill out the information below and we shall schedule an appointment for you to visit.</b>  </center>

        <img className="adimg" src={pet.image} height= "300px" width='300px' border-radius="8px" box-shadow=" 0 2px 3px #000000" padding="100px" ></img>

        <form onSubmit={this.formSubmit}>

          <Container >

            <Row>
                <TextField className="input-class"
                  id="standard-basic"
                  type="text"
                  variant="outlined"
                  value={this.state.email}
                  error={this.state.emailError !== null}
                  helperText={this.state.emailError}
                  onChange={e => this.onValueChange(e, 'email')}
                  onBlur={this.isSubmitDisabled}
                  required label="Email Address" 
                  />
   
  
              <TextField
                id="datetime-local"
                label="Preferred Adoption Visit"
                type="date"
                defaultValue="2020-08-04T10:30"
                onChange={e => this.onValueChange(e, 'adoptDate')}

                InputLabelProps={{
                  shrink: true,
                }}
              />
              
            </Row>
            <Row>
              
                <TextField className="input-class"
                  className="textarea"
                  id="comment"
                  label="Why do you like this Pet"
                  multiline
                  rows={8}
                  id="standard-basic"
                  type="text"
                  variant="outlined"
                  error={this.state.commentError !== null}
                  helperText={this.state.commentError}
                  onChange={e => this.onValueChange(e, 'comment')}
                  id="standard-basic" required 
                  onBlur={this.isSubmitDisabled}
                   />
            </Row>
            <Row>
              <Button type="submit" className="btn" value="Submit Adoption Request" size="lg" variant="primary">Submit Adoption Request</Button>
             
            </Row>
            {this.state.message ? (
                        <Alert variant="success">
                            <Alert.Heading>Payment Success</Alert.Heading>
                            <p>
                                You have successfully sponsored {pet.name}
                            </p>

                        </Alert>) : (<div></div>)}
          </Container>

        </form>


        <Footer />
      </div>

    );
  }
}

export default Adopt;