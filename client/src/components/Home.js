import React,{useContext} from 'react'
import Metamask_Error from './metamask_error'
import eth_png from '../assets/eth_png.png'
import ethbg_png from '../assets/eth_gif.gif'
import Search from './Search'
import '../styles/Home.css'

export const Home = ({address,contract,t_contract,ts_contract,error}) => {


    if(error){
        return(
            (<Metamask_Error />)
        )
    }
    else{
        return (
            <div className="Home">
            <Search address={address} contract={contract} t_contract={t_contract} ts_contract={ts_contract}/>
            <div className="intro-container">
                <div className="intro-text">
                    <h1>Edublocks</h1>
                    <p id="introduction">An Ethereum Blockchain based Education Platform</p>
                    <p id="quote">"The more you learn the more you earn"</p>
                </div>
                <div className="intro-img">
                    <img src={ethbg_png}  id="bg" alt="blockchain_animation"></img>
                    {/* <img src={eth_png} id="fg" alt="blockchain_animation"></img> */}
                </div>
            </div>
            <div className="information">
                    <h4>EDBX Token Address: {t_contract?._address}</h4>
                </div>
            </div>
        )
    }
}
