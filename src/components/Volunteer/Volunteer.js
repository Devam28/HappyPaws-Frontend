
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container, Button, Row } from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import NavbarComponent from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import dogVol from './dogvolunteer.jpg';
import './Volunteer.css';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return ( 
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Volunteer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const[fname,setFname]=React.useState("");
  const[lname,setLname]=React.useState("");
  const[email,setEmail]=React.useState("");
  const[contact,setContact]=React.useState("");
  const[event,setEvent]=React.useState("");

  
  const[emailError,setEmailError]=React.useState("");
  const[contactError,setContactError]=React.useState("");
  const[eventError,setEventError]=React.useState("");

  const[eventList,setEventList]=React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEmailError = (event) => {
    if(!email.includes("@"))
    {
        setEmailError("Invalid Email")
    }
    else
    {
        setEmailError("")   
    }
  };

  const handleContactError = (event) => {
    if(contact.length<10)
    {
        setContactError("Invalid Contact Number")
    }
    else if(contact.length>10)
    {
        setContactError("Invalid Contact Number")
    }
    else
    {
        setContactError("")   
    }
  };

  const handleEventError = (event) => {
    if(event==="Select an Event that you would like to volunteer")
    {
        setEventError("Please select an even to volunteer")
    }
    else
    {
        setEventError("")   
    }
  };

    React.useEffect(()=>{
    axios.get('http://localhost:5000/volunteer')
      .then(res => {
          //console.log(res.data)
        // const pets = res.data;
        // this.setState({ pets });
        setEventList(res.data)
        //this.setState({pets: res.data});
        
        // let d = this.state.pets;
        // let items = Object.values(d)
        // console.log(items.length)
      },[])
  });

 const onSubmit = () => {
   
      axios.post('http://localhost:5000/volunteer/volunteer',{firstName:fname,lastName:lname,email:email,contactNo:contact,eventName:event})
      .then(function(res){
          if(res.status===200&&res.statusText==='OK'){

          }
      })
      .catch(function(e){

      console.log("Error"+e);

      })
  }

  return (
    <div className="MainVolunteer">
    <NavbarComponent/> 
        
    <br/>
    <h2>Volunteer with us</h2>
    <div className="volunteerImg">
        <img src={dogVol} alt="Volunteer"></img>
    </div>
    <br/>
    <div className={classes.root}>
    
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Volunteer with HappyPaws" {...a11yProps(0)} />
        <Tab label="Current Volunteering Events" {...a11yProps(1)} />
        <Tab label="Register to Volunteer" {...a11yProps(2)} />
   
      </Tabs>
      <TabPanel value={value} index={0} >
              <h5>
                    <br/>
                    Don't have the time to Volunteer ? <br/>
                    You can join us at various shelters to Volunteer with our dogs and cats.<br/>
                    A little care and a lot of fun!
                </h5>
                <h5><b>All you have to do is</b></h5>
                <h6>
                  1.Browse through our list of current events<br/>
                  2.Choose and event that you would like to volunteer for<br/>
                  3.Fill out our registration form <br/>
                  4. Wait for our response via email to confirm your volunteering slot<br/>
                  5.Come to the event, volunteer and have fun with the pets!<br/>
                </h6>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <center >
          <b><i>List of current Volunteering events for you to participate</i></b> 
            <ul className="events">
                        {eventList.map(item => (
                    <li key={item._id}>
                    {item.eventName}
                    </li>
                ))}               
            </ul>
        </center>
      </TabPanel>
      <TabPanel value={value} index={2}>
     
      <div className="FormVolunteer">
          
      <form className="form" onSubmit={onSubmit} action="/" >
          <h4>Fill up the registration form to Volunteer with us</h4>
                        <div>
                            <Container>
                                <Row className="rows" >

                                    <TextField
                                        required
                                        label="First Name"
                                        value={fname}
                                        onChange={e=>setFname(e.target.value)}
                                        variant="outlined"
                                    />

                                    <TextField
                                        required
                                        label="Last Name"
                                        value={lname}
                                        onChange={e=>setLname(e.target.value)} 
                                        variant="outlined"
                                        />
                                </Row>

                                <Row className="rows">
                                    <TextField
                                        required
                                        label="Email"
                                        value={email}
                                        onChange={e=>setEmail(e.target.value)}
                                        helperText={emailError}
                                        error={emailError}
                                        onBlur={handleEmailError}
                                        variant="outlined"
                                    />
                                    <TextField
                                    required
                                        label="Contact Number"
                                        type="number"
                                        value={contact}
                                        onChange={e=>setContact(e.target.value)}
                                        helperText={contactError}
                                        error={contactError}
                                        onBlur={handleContactError}
                                        variant="outlined"
                                    />
                                </Row>
                                <Row className="rows">
                                    <select className="dropdown" 
                                    helperText={eventError}
                                    error={eventError}
                                    onBlur={handleEventError}
                                    onChange={e=>setEvent(e.target.value)}>
                                    <option>Select an Event that you would like to volunteer</option>               
                                    {eventList.map(item => 
                                    <option key={item._id}>{item.eventName}</option>
                                    )}                
                                    </select>
                                   
                                </Row>
                                
                                <Row className="rows">
                                
                                  <Button type="submit" size="lg" variant="outline-primary">Volunteer</Button>
                                 
                                </Row>            
                                </Container>

                        </div>
                    </form>
           </div> 
      </TabPanel>
     
    </div>
    
    <Footer/>
    </div>
  );
}
