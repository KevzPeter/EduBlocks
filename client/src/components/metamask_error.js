import metamask from '../assets/metamask.png'
import {Button} from 'react-bootstrap'
import '../styles/Metamask.css'
const Metamask_Error=()=>{
    return(
        <div className="Metamask">
        <h3>Install Metamask for your Browser</h3>
        <img src={metamask} alt="metamask logo"></img>
        <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" rel="noreferrer">
        <Button className="btn btn-info" >Download</Button>
        </a>
        </div>
    )
}

export default Metamask_Error