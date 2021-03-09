import React,{useEffect, useMemo, useState} from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3'
import {Switch,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Navigation from './components/Navbar'
import Footer from './components/Footer'
import Student from './components/student'
import Educator from './components/educator'
import Course from './components/Course'
import {UserContext} from './UserContext'
import {Home} from './components/Home'
import {Error} from './components/Error'
import {Login} from './components/login'
import {Signup} from './components/signup'

function App() {

  const[id,setID]=useState(null)
  const value=useMemo(()=>({id,setID}),[id,setID])
 
  return (
    <div className="App">
       <UserContext.Provider value={value}>
       <Navigation/>
      <Switch>
        <Route path="/login" render={(props)=>(<Login {...props}/>)}></Route>
        <Route path="/signup" render={(props)=>(<Signup {...props}/>)}></Route>
        <Route path="/student" render={(props)=>(<Student {...props}/>)}></Route>
        <Route path="/educator" component={Educator}></Route>
        <Route path="/course" component={Course}></Route>
        <Route path="/" component={Home} exact></Route>
        <Route component={Error} />
      </Switch>
       </UserContext.Provider>
    </div>
  );
}

export default App;
