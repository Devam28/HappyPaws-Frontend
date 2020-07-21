import React, { Component } from 'react';
import contactus from './contactus.jpg';
import facebook from './facebook.jpg';
import insat from './insta.png';
import twitter from './twitter.png';
import {Form, Button, Jumbotron,Container,Row, Col, Image} from 'react-bootstrap';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

class ContactUs extends Component {
    constructor(props){
        super(props);
        this.state={
        body : null,
        subject : null,
        name: null,
        email: null,
        nameError : null,
        subjectError : null,
        bodyError: null,
        emailError: null,
        flag: false };
    };

    validateUser = () => {
        // Code for comparing the input with the user credentials stored in the database
        // An API request will be made to the backend, which will fetch data from database and send it to the frontend
        if (this.state.name!==null && this.state.email!== null && this.state.body!== null && this.state.subject!== null){
            console.log("Form submitted ");
            alert("Form submitted successfully. We will get back to you shortly!");
            
        }
        else{
            if(this.state.nameError!=null)
                alert("Please enter your name.");
            else if(this.state.emailError!=null)
                alert("Please enter valid email id.");
            else if(this.state.subjectError!=null)
                alert("Please write appropriate Subject."); 
            else if(this.state.bodyError!=null)
                alert("Please write appropriate message so that we can assist you further.");  
        }
    };

    onNameChange= (e) => {
        const val= e.target.value;
        if (val !== null && val!=="" && val!==" " && val.length>1){
            this.state.nameError = null;
            this.setState({
            name: e.target.value,
            });
        }
        else{
            this.setState({
                nameError: "Please enter valid name",
            });
        }
      }

      onBodyChange= (e) => {
        const val= e.target.value;
        if (val!==null && val!=="" && val!==" " && val.length>10){
            this.state.bodyError = null;
            this.setState({
            body: e.target.value,
            });
        }
        else{
            this.setState({
                bodyError: "Body part must be more than 10 characters",
            });
        }
      }

      onEmailChange= (e) => {
        const regexpr = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ );
        const val= e.target.value;
        if (val!==null && val!=="" && val!==" " && val.length>8){
            this.state.emailError = null;
            if(regexpr.test(val)==true){
                this.setState({
                email: e.target.value,
                });
            }
        }
        else{
            this.setState({
                emailError: "Please enter valid email address",
            });
        }
      }


      onSubjectChange= (e) => {
        const val= e.target.value;
        
        if (val!==null && val!=="" && val!==" " && val.length>8){
            this.state.subjectError = null;            
            this.setState({
            subject: e.target.value,
            });
            
        }
        else{
            this.setState({
                subjectError: "Subject length must be more than 8 characters",
            });
        }
      }

    render() { 
        
        return ( 
            <React.Fragment>
            <NavbarComponent/>
            <div className="search_css">
            
            <Row >
                <Jumbotron fluid className="class-jumbotron">
                    <Container>
                        <Row>
                            <Col xs={6} md={4}> 
                                <Image src={contactus} height="280px" width="280px" roundedCircle />
                            </Col>
                            <Col xs={12} md={8}>
                                <h3 style={{paddingTop:'6vh'}}>Contact Information</h3>
                                <p >Phone: 902-999-9999</p>
                                <p>Email: support@happypaws.com</p>
                                <p>Address: 1113 WaterBridge Terminal, 
                                    B3A A3B, Halifax, NS, Canada
                                </p>
                                <Button variant="outline-info" style={{marginLeft:'25px',marginRight:'25px'}}><img src={facebook} height="30px" width="30px" /></Button>
                                <Button variant="outline-info" style={{marginLeft:'25px',marginRight:'25px'}}><img src={twitter} height="30px" width="30px"/></Button>
                                <Button variant="outline-info" style={{marginLeft:'25px',marginRight:'25px'}}><img src={insat} height="30px" width="30px"/></Button>
                    
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
                <form >
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
                </form>
            </Row>
                </div>
                </div>
                </div>
                <Footer/>
                </React.Fragment>
         )};
}
 
export default ContactUs;