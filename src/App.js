/************
 * Author: Moni Shah 
 **********/

import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Switch , Link} from 'react-router-dom';
import Search from './components/Search/search';
// import NavBar from './components/navBar';
import ContactUs from './components/ContactUs/contactus';
import DonateUs from './components/DonateUs/DonateUs';
// import Login from './components/Login-Register/Login';
import Login from './components/Login/Login';
import Shareyourstory from './components/Shareyourstory/Shareyourstory';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Enquire from './components/Enquire/Enquire';
import Adopt from './components/Adopt/Adopt';
import Volunteer from './components/Volunteer/Volunteer';
import Navbar from './components/Navbar/Navbar';
import PetCare from './components/PetCare/PetCare';
import Sponsor from './components/SponsorPet/Sponsor';
import UserProfile from './components/UserProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ForgetPasswordEmail from './components/ForgetPassword/ForgetPasswordEmail';



// Routes of every component mentioned here.
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/donation" exact component={DonateUs} />
        <Route path="/share" exact component={Shareyourstory} />
        <Route path="/profile/:id" exact component={Profile}/>
        <Route path="/enquire/:id" exact component={Enquire}/>
        <Route path="/adopt/:id" exact component={Adopt}/>
        <Route path="/volunteer" exact component={Volunteer}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/petCare" exact component={PetCare}/>
        <Route path="/sponsor/:id" exact component={Sponsor}/>
        <Route path='/register' component={Register}/> 
        <Route path='/search' component={Search}/>
        <Route path='/contactus' component={ContactUs}/>
        <Route path ='/userprofile' component={UserProfile} />
        <Route path ='/forgetPassword' component={ForgetPassword} /> 
        <Route path ='/forgetPasswordEmail' component={ForgetPasswordEmail} /> 
        <Route path = '/logout' component={HomePage}/>
      </Switch>
      </React.Fragment>
  );
}

export default App;
