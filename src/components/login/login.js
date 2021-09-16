import React from 'react'
import './login.css'
import { useDispatch } from 'react-redux'
import { loginUser,toggle } from '../../Redux/actions/useractions'
import { useState } from 'react'
import { useHistory,Link } from 'react-router-dom'
const Login = () => {
    let history = useHistory()
  const dispatch = useDispatch()
  const [user, setuser] = useState({})
    return (
        <div className="form-div" id="login">
        <form className='fifi'>
        <div className="form-header"><i className="fas fa-lock" style={{width:'30px',size:'5x'}}></i>
          <p style={{fontSize:'25px'}}>Login</p>
        </div>
        <div className="form-inp">
          <i className="fas fa-envelope" /><input placeholder="Email" type="email"  name="email"
                            onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})}/>
        </div>
        <div className="form-inp">
          <i className="fas fa-lock" /><input placeholder="Password" type="password"  name="PassWord"
                            onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})} />
        </div>
        <input className="but" type="submit" value="Login"  onClick={(e)=>{e.preventDefault(); dispatch(loginUser(user,history))}}/><Link to='' onClick={()=>dispatch(toggle())} > 
        <div className="font-weight-light"><br/>
            <p style={{textAlign:"center",color:'gray'}}>Not a member? Sign Up</p>
        </div></Link>
        </form>
        </div>
    )
}
export default Login