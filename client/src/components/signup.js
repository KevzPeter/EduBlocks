import React, { useState } from 'react'
import {Link,useHistory} from 'react-router-dom'
import '../styles/Login.css'

export const Signup =({address,driversm})=>{

    const history = useHistory();
    const[name,setName]=useState('')
    const[pass,setPass]=useState('')
    const[acc,setAcc]=useState(false)
    const[succ,setSucc]=useState(false)
    const[fail,setFail]=useState(false)
    const[passerr,setPasserr]=useState(false)
    const[blankerr,setBlankerr]=useState(false)

    const success=()=>{
        history.push("/login");
    }
    //   const addDriver=async()=>{
    //    await driversm.methods.addDriver(name,pass,parseInt(exp),parseInt(accidents),parseInt(coins),parseInt(fines),JSON.parse(acc))
    //     .send({from:address}, (err, hash) => {
    //         if (err) { 
    //         console.log("error on deployment: ", err) 
    //         setFail(true)
    //         }
    //         else{
    //             console.log("Hash: ", hash)
    //             setSucc(true)
    //         }
            
    //     })
    //   }
    const passError=()=>{
        return(
            <div className="alert alert-danger" role="alert">
                <p>Password should contain more than 8 characters</p>
            </div>
        )
    }
    const blankError=()=>{
        return(
            <div className="alert alert-danger" role="alert">
                <p>One or more input fields is blank</p>
            </div>
        )
    }
    const failure=()=>{
            return(
                <div className="alert alert-danger" role="alert">
                    <h4>Failed! Try again after sometime</h4>
                </div>
            )
    }
    const checkpassword=()=>{
        if(pass.length<8){
            setPasserr(true)
            return false;
        }
        else{
            setPasserr(false)
            return true;
        }
    }
    const checkblank=()=>{
        if(name.length===0 || name.length===undefined ||pass.length===0 || pass.length===undefined){
            setBlankerr(true)
            return false;
        }
        else{
            setBlankerr(false)
            return true;
        }
    }
    const post=()=>{
        checkpassword()
        checkblank()
        // if(checkblank && checkpassword){
        //     setSucc(true)
        // }
        // else{
        //     setFail(true)
        // }
    }
    return(
        <div className="outer-container justify-content-center">
            <div className="text-center py-2">{succ?success():fail?failure():null}</div>
            <div className="text-center py-2">
                <h4>Signup</h4>
            </div>
            <div className="col-md-4 offset-md-4 py-2">
                <form>
                <div className="form-field">
                <span><i className="fas fa-user-circle fa-2x"></i></span>
                <input className="form-control my-2" type="text" id="name" name="name" 
                placeholder="Name" onChange={e=>setName(e.target.value)}></input>
                </div>
                <div className="form-field">
                <span><i className="fas fa-key fa-2x"></i></span>
                <input className="form-control my-2" type="password" id="pass" name="pass" 
                placeholder="Password" onChange={e=>setPass(e.target.value)}></input>
                </div >
                <div className="form-field">
                <label>
                    Choose account type :
                    <select onChange={e=>setAcc(e.target.value)}>
                        <option value="false">Student</option>
                        <option value="true">Educator</option>
                    </select>
                    </label>
                </div>
                {passerr?passError():null}
                {blankerr?blankError():null}
                </form>
            </div>
            <div className="text-center py-2">
                <button type="submit" className="btn btn-primary" onClick={post}>Register</button>
                <p id="help"><em>Already have an account? </em>
                <Link to={'/login'}> Login!</Link></p>
            </div>
        </div>
    )
}