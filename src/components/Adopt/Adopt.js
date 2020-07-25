import React, { Component } from 'react';
import './Adopt.css';
import Button from 'react-bootstrap/Button'
import Dog from './dog.jpg';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Form, Container, Row, Col } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const primeState = {
  email: '',
  comment: '',
  emailError: null,
  commentError: null,
  disabled: true,
}

class Adopt extends Component {
  constructor(props) {
    super(props)

    this.state = primeState;
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
      if (this.state.name !== '') {
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

  onValueChange = (e, label) => {
    const nextState = {};
    nextState[label] = e.target.value;;
    this.setState(nextState);
  }


  // handleEmail = (event) => {
  //   this.setState({
  //     email: event.target.value
  //   })
  // }

  // handleComment = (event) => {
  //   this.setState({
  //     comment: event.target.value
  //   })
  // }

  // check = () => {
  //   let mailError = "";
  //   let commentError = "";
  //   if (!this.state.email.includes('@')) {
  //     mailError = "INVALID EMAIL";
  //   }
  //   if (!this.state.email) {
  //     mailError = "BLANK EMAIL"
  //   }
  //   if (!this.state.comment) {
  //     commentError = "BLANK COMMENT"
  //   }
  //   if (mailError || commentError) {
  //     this.setState({ mailError, commentError });
  //     return false;
  //   }
  //   if (mailError) {
  //     this.setState({ mailError });
  //     return false;
  //   }
  //   return true;
  // };

  // formSubmit = (event) => {
  //   event.preventDefault()
  //   const isRight = this.check();
  //   if (isRight) {
  //     alert(`Your query has been set to us. We shall get back to you shortly`)
  //     this.setState(primeState)
  //     this.props.history.push('/');
  //   }

  // }

  formSubmit = (event) => {
    event.preventDefault()
    alert(`Your query has been set to us. We shall get back to you shortly` +this.state.email)
    this.setState(primeState)
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="FormAdopt">
        <NavbarComponent />
        <br />
        <br />

        <h3><i><b>Adopt</b></i></h3>
        <center><b>Would you like to adopt this pet? Fill out the information below and we shall schedule an appointment for you to visit.</b>  </center>

        <br />
        <br />
        <br />

        <form onSubmit={this.formSubmit}>

          <Container>

            <Row className="aRow">
              <div className="custom-class">
                <TextField className="input-class"
                  id="standard-basic"
                  type="text"
                  variant="outlined"
                  error={this.state.emailError !== null}
                  helperText={this.state.emailError}
                  onChange={e => this.onValueChange(e, 'email')}
                  onBlur={this.isSubmitDisabled}
                  required label="Email Address" /></div>
              {/* <TextField required
                label="Email Address"
                variant="outlined"
                helperText={this.state.mailError}
                onChange={this.handleEmail} 
              />*/}


              <TextField
                id="datetime-local"
                label="Preferred Adoption Visit"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"

                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Row>
            <Row>
              <div className="custom-class">
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
                   /></div>

              {/* <TextField
                required
                className="textarea"
                id="comment"
                label="Why do you like this Pet"
                multiline
                rows={8}

                variant="outlined"
                helperText={this.state.commentError}
                onChange={this.handleComment}
              /> */}
            </Row>

            <Row>
              <Button type="submit" className="btn" value="Submit Adoption Request" size="lg" variant="outline-primary">Submit Adoption Request</Button>
             
            </Row>

          </Container>

        </form>


        <Footer />
      </div>

    );
  }
}

export default Adopt;