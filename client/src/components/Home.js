import React,{useContext} from 'react'
import Metamask_Error from './metamask_error'
import Ethererum_GIF from '../assets/ether_animation.gif'
import Search from './Search'
import { UserContext } from '../UserContext'

import '../styles/Home.css'

export const Home = ({error}) => {

    const {id,setID}=useContext(UserContext)

    if(error){
        return(
            (<Metamask_Error />)
        )
    }
    else{
        return (
            <div className="Home">
            <Search/>
            <div className="intro-container">
                <div className="intro-text">
                    <h1>Edublocks</h1>
                    <p id="introduction">An Ethereum Blockchain based Education Platform</p>
                    <p id="quote">"The more you learn the more you earn"</p>
                </div>
                <div className="intro-img">
                    <img src={Ethererum_GIF} alt="blockchain_animation"></img>
                </div>
            </div>
            </div>
        )
    }
}
