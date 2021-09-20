import React,{useEffect} from 'react'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, toggle,alerte } from '../../Redux/actions/useractions'
import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
const Login = () => {
  let history = useHistory()
  const errors = useSelector(state => state.userReducer.errors)
  const dispatch = useDispatch()
  const [user, setuser] = useState({})
useEffect(() => {
  if(errors){return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    confirmButtonText: 'OK',
    text: errors})
    .then((result) => {
      dispatch(alerte())
      })
}
}, [errors])
  return (

    <div className="form-div" id="login">
     
      <form className='fifi'>
        <div className="form-header"><i className="fas fa-lock" style={{ width: '30px', size: '5x' }}></i>
          <p style={{ fontSize: '25px' }}>Login</p>
        </div>
        <div className="form-inp">
          <i className="fas fa-envelope" /><input placeholder="Email" type="email" name="email"
            onChange={(e) => setuser({ ...user, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-inp">
          <i className="fas fa-lock" /><input placeholder="Password" type="password" name="PassWord"
            onChange={(e) => setuser({ ...user, [e.target.name]: e.target.value })} />
        </div>
        <input className="but" type="submit" value="Login" onClick={(e) => {  e.preventDefault(); dispatch(loginUser(user, history)) }} /><Link to='' onClick={() => dispatch(toggle())} >
          <div className="font-weight-light"><br />
            <p style={{ textAlign: "center", color: 'gray' }}>Not a member? Sign Up</p>
          </div></Link>
      </form>
    </div>
  )
}
export default Login