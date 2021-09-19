import React,{useEffect} from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { useDispatch,useSelector } from 'react-redux'
import { useState } from 'react'
import { registerUser } from '../../Redux/actions/useractions'
import Swal from 'sweetalert2'
import './signup.css'
const Signup = () => {
  const errors = useSelector(state => state.userReducer.errors)
  useEffect(() => {
    if(errors){return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${errors.name ||""} ${errors.email||""}  ${errors.PassWord||""} `,
    })}
  }, [errors])
  let history = useHistory()
  const dispatch = useDispatch()
  const [state, setstate] = useState({ Role: 'client' })
  const [password, setpassword] = useState('')
 const [role, setrole] = useState('Role')
  return (
    <div className="form-divv" id='login'>
      <form className="fifii">
        <div className="form-headerr">
          <p style={{ fontSize: '25px' }}>Sign Up</p>
        </div>
        <div className="form-inpp"><i class="fas fa-user"></i>
          <input placeholder="Name" type="text" name="name"
            onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-inpp">
          <i className="fas fa-envelope" /><input  placeholder="Email" type="email" name="email" 
            onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-inpp">
          <i className="fas fa-lock" /><input placeholder="Password" type="password" name="PassWord"
            onChange={(e) => setstate({ ...state, [e.target.name]: e.target.value })} />
        </div>
        <div className="form-inpp">
          <i className="fas fa-lock" /><input placeholder="Repeat password" type="password" name="passwordrepeat"
            onChange={(e) => setpassword({ [e.target.name]: e.target.value })} />
        </div><br />
        <div>
        <Dropdown text={role} active={true} >
        <Dropdown.Menu>
          <Dropdown.Item  onClick={() => {setrole('Client');setstate({ ...state, Role: 'client' })}}>Client</Dropdown.Item>
          <Dropdown.Item  onClick={() => {setrole('Technician'); setstate({ ...state, Role: 'technician' })}}>Technician</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
        </div>
        <input className="butt" type="submit" value="Signup" onClick={(e) => { e.preventDefault(); if (state.PassWord === password.passwordrepeat) {dispatch(registerUser(state, history)) } else {alert('check your password')}}} />
        </form>
    </div>
  )
}
export default Signup;