import React, { Component } from 'react';
import {Col, Image, Row, Card, Form, FormControl, Button } from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import {FormControl as FCMaterial} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import data from './data';
import './search.css';
import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

class Search extends Component {
  constructor(){
    super();

    this.state={
      search:null,
      type:null,
      breed:null,
      color:null,
      age:null,
      gender:null,
      proximity:null,
    };
  }

  // functions for setting the values of the state variables
  handleSearch=(e)=>{
    this.setState({search:e.target.value})
  };
  handleType=(e)=>{
    this.setState({type:e.target.value});
  };
  handleColor=(e)=>{
    this.setState({color:e.target.value})
  };
  handleAge=(e)=>{
    this.setState({age:e.target.value})
  };
  handleBreed=(e)=>{
    this.setState({breed:e.target.value})
  };
  handleProximity=(e)=>{
    this.setState({proximity:e.target.value})
  };
  handleGender=(e)=>{
    this.setState({gender:e.target.value})
  };

  // functions for comparing user input with the static data/ database
  search=(d)=>{
    if(this.state.search == null )
      return d;
    else if(d.name.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) || d.breed.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) || d.type.toString().toLowerCase().includes(this.state.search.toString().toLowerCase())){
      console.log("inside search"+this.state.search);
      return d;
    }
  };
  searchType=(d)=>{
    if(this.state.type == null ){
      return d;
    }
    else if(d.type.toString().toLowerCase().includes(this.state.type.toString().toLowerCase()) ){
      console.log("inside"+this.state.type);
      return d;
    }
  };
  searchColor=(d)=>{
    if(this.state.color == null )
      return d
    else if(d.color.toString().toLowerCase().includes(this.state.color.toString().toLowerCase()) ){
      return d
    }
  };
  searchBreed=(d)=>{
    if(this.state.breed == null )
      return d
    else if(d.breed.toString().toLowerCase().includes(this.state.breed.toString().toLowerCase()) ){
      return d
    }
  };
  searchGender=(d)=>{
    if(this.state.gender == null )
      return d
    else if(d.gender.toString().toLowerCase()==this.state.gender.toString().toLowerCase() ){
      return d
    }
  };
  searchAge=(d)=>{
    let age=d.age;
    let filtered;
    console.log("age"+age);
    console.log("state age"+this.state.age);
    switch(this.state.age){
      case null:
        return d;
      case "A":
        if(age<=5)
          filtered=d;
          break;
      case "B":
        if(age>5 && age<=10)
          filtered=d;
        break;
      case "C":
        if(age>10 && age<=20)
          filtered=d;
        break;
      case "D":
        if(age>20 && age<=30)
          filtered=d;
        break;
      case "E":
        if(age>30)
          filtered=d;
        break;
    }
    return filtered;
  };
    searchProximity=(d)=>{
      let location=d.location;
      let filtered;
      switch(this.state.proximity){
        case null:
          filtered=d;
        break;
        case "P":
          if(location<=5)
            filtered=d;
          break;
        case "Q":
          if(location>5 && location<=10)
            filtered=d;
          break;
        case "R":
          if(location>10 && location<=15)
            filtered=d;
          break;
        case "S":
          if(location>15)
            filtered=d;
          break;
      }
      return filtered;
    };

    //Clear all the filters
    clearFilter=(e)=>{
      this.setState({search:null,
        type:null,
        breed:null,
        color:null,
        age:null,
        gender:null,
        proximity:null,
      });
    }

    //Data to be rendered
render() { 
  let filteredData;
  let items = data.filter((d)=>{
    console.log("1");
    filteredData=this.search(d);
    return filteredData;
  }).filter((d)=>{
    console.log("2");
    filteredData=this.searchType(d);
    return filteredData;
  }).filter((d)=>{
    console.log("3");
    filteredData=this.searchColor(d);
    return filteredData;
  }).filter((d)=>{
    console.log("4");
    filteredData=this.searchBreed(d);
    return filteredData;
  }).filter((d)=>{
    console.log("6");
    filteredData=this.searchGender(d);
    return filteredData;
  }).filter((d)=>{
    console.log("5");
    filteredData=this.searchAge(d);
    return filteredData;
  }).filter((d)=>{
    console.log("7");
    filteredData=this.searchProximity(d);
    return filteredData;
  }).map(d=>{
    return(
     
      <Col sm={4} md={4} className="card-center">
            <ul  ><li>
              <Card className="m-2" style={{ width: '18rem' }}>
                
                <Card.Img variant="top" src={d.image} height="250px" width="250px"  />
                <Card.Body className="nav-background">
                  <Card.Title>{d.name}</Card.Title>
                  <Card.Text>
                  {d.age} Years | {d.breed} | {d.location} miles away
                  
                  </Card.Text>
                  <Button  className="button-css" variant="outline-primary"  onClick={() => this.props.history.push('/profile')}>View</Button>
                </Card.Body>
              </Card>
              </li></ul>
            </Col>
    
    )
  })

  return (  
  
    <React.Fragment>
      <div className="search_css">
        <NavbarComponent />
      <Row className="search-center m-5"> 
        <Form inline >
          <FormControl  type="text" placeholder="Search" onChange={(e)=>this.handleSearch(e)} />
          <Button className="button-css" variant="outline-primary" size="lg">Search</Button>
        </Form>
      </Row>
    <Row>
        <Col sm={2} md={2}>
          <FCMaterial className="search-center ml-5" >
            <InputLabel className="search-center options" width="100">Pet Type</InputLabel>
            <Select className="search-center options ml-5" defaultValue={this.state.type} onChange={this.handleType}>
              <option aria-label="None" value="" />
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Birds">Other</option>
            </Select>
          </FCMaterial>
          <FCMaterial className="search-center ml-5" >
            <InputLabel className="search-center options" width="100">Age</InputLabel>
            <Select className="search-center options ml-5" onChange={this.handleAge}>
              <option aria-label="None" value="" />
              <option value="A">1-5</option>
              <option value="B">6-10</option>
              <option value="C">11-20</option>
              <option value="D">21-30</option>
              <option value="E">Above 30</option>
            </Select>
          </FCMaterial>
          <FCMaterial className="search-center ml-5" >
            <InputLabel className="search-center options" width="100">Color</InputLabel>
            <Select className="search-center options ml-5" onChange={this.handleColor}>
              <option aria-label="None" value="" />
              <option value="brown">Brown</option>
              <option value="Golden">Golden</option>
              <option value="black">Black</option>
              <option value="Calico">Calico</option>
              <option value="Green and Yellow">Green and Yellow</option>
              <option value="gray">Gray</option>
            </Select>
          </FCMaterial>
          <FCMaterial className="search-center ml-5" >
            <InputLabel className="search-center options"  width="100">Breed</InputLabel>
            <Select className="search-center options ml-5" onChange={this.handleBreed}>
              <option aria-label="None" value="" />
              <option value="Golden Retriever">Golden Retriever (Dog)</option>
              <option value="Pug">Pug (Dog)</option>
              <option value="Labrador">Labrador (Dog)</option>
              <option value="German Shephard">German Shephard (Dog)</option>  
              <option value="foxhound">Foxhound (Dog)</option>
              <option value="husky">Husky (Dog)</option>
              <option value="corgy">Corgy (Dog)</option>
              <option value="Egyptian Mau">Egyptian Mau (Cat)</option>
              <option value="Domestic Long Hair">Domestic Long Hair (Cat)</option>
              <option value="tabby">Tabby (Cat)</option>
              <option value="turtle">Turtle (Turtle) </option>
              <option value="dwarf">Dwarf (Rabbit)</option>              
              <option value="Poicephalus">Poicephalus (Parrot)</option>        

            </Select>
          </FCMaterial>
          <FCMaterial className="search-center ml-5" >
            <InputLabel className="search-center options" width="100">Gender</InputLabel>
            <Select className="search-center options ml-5" onChange={this.handleGender} >
              <option aria-label="None" value="" />
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FCMaterial>
          <FCMaterial className="search-center ml-5" >
            <InputLabel className="search-center options"  width="100">Proximity</InputLabel>
            <Select className="search-center options ml-5" onChange={this.handleProximity}>
              <option aria-label="No" value="" />
              <option value="P">1-5 km</option>
              <option value="Q">6-10 km</option>
              <option value="R">11-15 km</option>
              <option value="S">More than 15</option>
            </Select>
          </FCMaterial>
          <Button variant="success m-5" className="button-css" variant="outline-primary"  onClick={this.clearFilter}>Clear Filters </Button>
        </Col>
        <Col sm={10} md={10}>
          <Row>
              {items}
          </Row>

      
        </Col>
      </Row>
      
      </div>
      <Footer />
    </React.Fragment>
  );
    }
}
 
export default Search;