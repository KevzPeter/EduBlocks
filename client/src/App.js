import React,{useEffect, useMemo, useState} from 'react';
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
// import EdublockContractabi from './contracts/EdublocksContract.json'

function App() {

  const [id,setID]=useState(null)
  const value=useMemo(()=>({id,setID}),[id,setID])
  const [contract,Setcontract]=useState()
  const [err,Seterr]=useState(false)
  const [acc,Setacc]=useState("")

  // useEffect(()=>{
  //   loadWeb3()
  //   LoadBlockchainData()
  // },[])

  // const loadWeb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     Seterr(true)
  //   }
  // };

  // const LoadBlockchainData=async()=>{
  //   if(window.web3){
  //   const web3=window.web3
  //   const accounts = await web3.eth.getAccounts()
  //   const networkId=await web3.eth.net.getId()
  //   const networkData=EdublocksContractabi.networks[networkId]
  //   const account = accounts[0]
  //   Setacc(account)
  //   if(networkData){
  //     const Edublocks_Contract=new web3.eth.Contract(EdublocksContract.abi,networkData.address)
  //     setDriversm(Edublocks_Contract)
  //     }
  //   }
  //   else{
  //     window.alert('Error! Smart Contract not deployed')
  //   }
  //   }
  
  return (
    <div className="App">
       <UserContext.Provider value={value}>
       <Navigation/>
      <Switch>
        <Route path="/login" render={(props)=>(<Login {...props} contract={contract}/>)}></Route>
        <Route path="/signup" render={(props)=>(<Signup {...props} address={acc} contract={contract}/>)}></Route>
        <Route path="/student" render={(props)=>(<Student {...props}/>)} contract={contract} ></Route>
        <Route path="/educator" component={Educator} contract={contract}></Route>
        <Route path="/course" component={Course} contract={contract}></Route>
        <Route path="/" render={(props)=>(<Home {...props} contract={contract} error={err}/>)} exact></Route>
        <Route component={Error} />
      </Switch>
       </UserContext.Provider>
    </div>
  );
}

export default App;
