import React,{ useContext, useState } from 'react'
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../UserContext';
import '../styles/Login.css'


export const Login =({driversm})=>{

    const history = useHistory()
    const[pass,setPass]=useState('')
    const[name,setName]=useState('')
    const[type,setType]=useState(true)
    const {id,setID}=useContext(UserContext)
    const[fail,setFail]=useState(false)
    const[passerr,setPasserr]=useState(false)

    const error=(err)=>{
        if(err){
            return(
                <div className="alert alert-danger" role="alert">
                    <p>Please fill all fields</p>
                </div>
            )
        }
        else{
            return(null)
        }
    }
    const failure=()=>{
        return(
            <div className="alert alert-danger" role="alert">
                <h4>Incorrect Details. Check email/password</h4>
            </div>
           
        )
    }
    const loginfunc=async()=>{
        history.push(`/student/${id}`)
        // await driversm.methods.login(name,pass).call().then(
        //     res=>{
        //         if(res[0]!=9999 && res[0]!=0){
        //             setID(res[0])
        //             setFail(false)
        //             if(res[1]===true){
        //                 history.push("/officer");
        //             }
        //             else{
        //                 history.push("/driver")
        //             }
        //         }
        //        else{
        //            setFail(true)
        //        }
        //     }
        // )
    }
    const post=()=>{
        if(pass.length===0||name.length===0){
            setPasserr(true)
        }
        else{
            setPasserr(false)
            loginfunc()
        }
        
    }

    return(
        <div className="outer-container justify-content-center">
            <div className="text-center py-2">{fail?failure():null}</div>
            <div className="text-center py-2">
                <h4>Login</h4>
            </div>
            <div className="col-md-4 offset-md-4 py-2">
                <form>
                    <div className="form-field">
                    <span><i className="fas fa-user-circle fa-2x"></i></span>
                    <input className="form-control my-2" type="text" id="name" name="name" 
                    placeholder="Name" autoComplete="on" onChange={e=>setName(e.target.value)}></input>
                    </div>
                    <div className="form-field">
                    <span><i className="fas fa-key fa-2x"></i></span>
                    <input className="form-control my-2" type="password" id="pass" name="pass"
                     placeholder="Password" autoComplete="on" onChange={e=>setPass(e.target.value)}></input>
                    </div>
                    {passerr?error(true):null}
                </form>
                <div className='custom-control custom-switch'>
                    <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customSwitchesChecked'
                            defaultChecked
                            onChange={e=>{setType(!type)}}/>
                        <label className='custom-control-label' htmlFor='customSwitchesChecked'>
                            Login as Student
                        </label>
                    </div>
            </div>
            <div className="text-center py-2">
                <button type="submit" className="btn btn-primary" onClick={post}>Login</button>
                <p id="help"><em>Don't have an account? </em>
                <Link to={'/signup'}> Create one now!</Link></p>
            </div>
        </div>
    )
}